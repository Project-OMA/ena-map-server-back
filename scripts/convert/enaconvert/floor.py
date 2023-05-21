import os
import random
from typing import Dict, List, Tuple, Union

import numpy as np
from PIL import Image, ImageFilter

from .data import Floor, TileGrid
from .data import TileID as Tile
from .image import generate_img_rectangles

__all__ = ["generate_floors"]


PathLike = Union[str, bytes, os.PathLike]


def map_to_img(data: TileGrid) -> Image.Image:
    arr = np.array(data, dtype=np.uint8)
    img = Image.fromarray(arr * 255, mode="L")
    return img


def img_to_map(img: Image.Image) -> TileGrid:
    arr = np.array(img, dtype=np.uint8)
    data = arr // 255
    return data


def point_distance_map(
    data: TileGrid, export_img: bool = False, debug: bool = False
) -> Dict[int, List[Tuple[int, int]]]:
    img_floor = map_to_img(data)

    distance_map = {}
    distance_arr = np.zeros((img_floor.height, img_floor.width), dtype=np.uint8)

    outline = img_floor.copy()
    outline_arr = np.array(img_to_map(outline))

    floor_arr = data

    i = 0
    while True:
        outline = img_floor.filter(ImageFilter.FIND_EDGES)
        outline_arr = img_to_map(outline)

        if not outline_arr.any():
            break

        # Remove outline from the floor to get the next outline
        floor_arr = np.subtract(floor_arr, outline_arr)
        if debug:
            img_floor_prev = img_floor.copy()
        img_floor = map_to_img(floor_arr)

        # Stitch floor, outline and shrunk floor into the same image
        if debug:
            w = img_floor.width
            stitch = Image.new("RGB", (w * 3, img_floor.height))
            stitch.paste(img_floor_prev, (0, 0))
            stitch.paste(outline, (w, 0))
            stitch.paste(img_floor, (w * 2, 0))
            stitch.show()

        color = i % 2
        if export_img:
            distance_arr = np.where(outline_arr == 1, color, distance_arr)

        # convert (row, col) to (x, y)
        points_at_distance = [
            (int(x), int(y)) for (y, x) in zip(*np.where(outline_arr == 1))
        ]
        distance_map[i] = points_at_distance
        i += 1

    if export_img:
        map_to_img(distance_arr).save("distance_map.png")

    return distance_map


def check_out_of_bounds(x1: int, y1: int, x2: int, y2: int, data: TileGrid) -> bool:
    """Check if all cells in the given area are within the bounds of the grid."""

    width = len(data[0]) - 1
    height = len(data) - 1
    if x1 < 0 or x1 > width:
        return True
    if x2 < 0 or x2 > width:
        return True
    if y1 < 0 or y1 > height:
        return True
    if y2 < 0 or y2 > height:
        return True
    return False


def check_direction(x1: int, y1: int, x2: int, y2: int, data: TileGrid) -> bool:
    """Check if all cells in the given area contain tiles (non-empty)."""

    if check_out_of_bounds(x1, y1, x2, y2, data):
        return False
    return all(
        data[y][x] == Tile.TILE for x in range(x1, x2 + 1) for y in range(y1, y2 + 1)
    )


def check_left(floor: Floor, data: TileGrid) -> bool:
    x = floor.x1 - 1
    return check_direction(x, floor.y1, x, floor.y2, data)


def check_right(floor: Floor, data: TileGrid) -> bool:
    x = floor.x2 + 1
    return check_direction(x, floor.y1, x, floor.y2, data)


def check_up(floor: Floor, data: TileGrid) -> bool:
    y = floor.y1 - 1
    return check_direction(floor.x1, y, floor.x2, y, data)


def check_down(floor: Floor, data: TileGrid) -> bool:
    y = floor.y2 + 1
    return check_direction(floor.x1, y, floor.x2, y, data)


def generate_best_floor(
    data: TileGrid,
) -> Floor:
    distance_map = point_distance_map(data)

    # Pick the first point that's farthest in the distance map
    # and use it as the start of the floor
    max_distance = max(distance_map)
    start = distance_map[max_distance][0]

    # Grow the floor from the start point until we can no longer grow it
    floor = Floor(start, start)
    can_grow = True
    while can_grow:
        can_grow = False
        if check_left(floor, data):
            floor.start = (floor.start[0] - 1, floor.start[1])
            can_grow = True
        if check_right(floor, data):
            floor.end = (floor.end[0] + 1, floor.end[1])
            can_grow = True
        if check_up(floor, data):
            floor.start = (floor.start[0], floor.start[1] - 1)
            can_grow = True
        if check_down(floor, data):
            floor.end = (floor.end[0], floor.end[1] + 1)
            can_grow = True

    return floor


def generate_floors(data: TileGrid, export_img: bool = True) -> List[Floor]:
    floors = []
    frames = []

    remaining_floors = sum(cell == Tile.TILE for line in data for cell in line)

    while remaining_floors > 0:
        floor = generate_best_floor(data)
        floors.append(floor)
        for y in range(floor.y1, floor.y2 + 1):
            for x in range(floor.x1, floor.x2 + 1):
                data[y][x] = Tile.EMPTY
                remaining_floors -= 1

        if export_img:
            img = generate_img_rectangles(floors, data, highlight_last=True)
            frames.append(img)

        area = (floor.x2 - floor.x1 + 1) * (floor.y2 - floor.y1 + 1)
        # print(
        #     f"Piso #{len(floors):3} | Área: {area:4} | Tiles restantes: {remaining_floors:5}"
        # )

    if export_img:
        frames[0].save(
            "best_floors.png",
            format="png",
            # append_images=frames[1:],
            # save_all=True,
            # duration=150,
            # loop=0,
        )

    return floors


def decode_map(path: PathLike) -> TileGrid:
    with open(path, "r") as f:
        map_str: str = f.read()
    map_data = map_str.split("\n")

    chars = lambda x: Tile.TILE if x == "#" else Tile.EMPTY
    map_data_int = [[chars(char) for char in line] for line in map_data]
    return map_data_int


def main():
    from pathlib import Path

    map_data = decode_map(Path("examples", "floor_demo.txt"))
    img = map_to_img(map_data)
    img.save("mapaChao.png")

    floor_count_before = sum(cell == Tile.TILE for line in map_data for cell in line)

    floors = generate_floors(map_data, export_img=True)
    img = generate_img_rectangles(floors, map_data)
    img.save("mapaChaoFloors.png")

    floor_count_after = len(floors)
    percent_reduction = 100 - (floor_count_after / floor_count_before) * 100


# print("")
# print(f"Before: {floor_count_before} floors")
# print(f"After: {floor_count_after} floors (-{percent_reduction:.1f}%)")


if __name__ == "__main__":
    main()
