import json
from typing import List

from PIL import Image

from .data import TileGrid
from .data import TileID as Tile
from .data import Wall
from .image import generate_img_rectangles

__all__ = ["get_best_walls"]


def load_tiles_from_img(path: str) -> TileGrid:
    img = Image.open(path)
    width, height = img.size
    tiles = [[Tile.EMPTY] * width for _ in range(height)]
    for x in range(width):
        for y in range(height):
            color = img.getpixel((x, y))
            if color == (0, 0, 0, 255):
                tiles[y][x] = Tile.TILE
    return tiles


def generate_img(walls: List[Wall], tiles: List[List[int]]) -> None:
    # generate image from the tiles
    width = len(tiles[0])
    height = len(tiles)
    img = Image.new("RGBA", (width, height), color=(255, 255, 255, 0))
    for wall in walls:
        for x in range(wall.start[0], wall.end[0] + 1):
            for y in range(wall.start[1], wall.end[1] + 1):
                alpha: int = img.getpixel((x, y))[3] + 63
                img.putpixel((x, y), (255, 0, 0, alpha))
    img.save("walls.png")


def generate_walls(tiles: TileGrid, vertical: bool = True) -> List[Wall]:
    prev_empty = True
    walls: list[Wall] = []
    wall_start = (0, 0)
    wall_length = 0

    if vertical:
        col_iterable = zip(*tiles)
        swizzle = lambda x, y: (y, x)
    else:
        col_iterable = tiles
        swizzle = lambda x, y: (x, y)

    for y, row in enumerate(col_iterable):
        prev_empty = True
        for x, tile in enumerate(row):
            if tile == Tile.TILE:
                if prev_empty:
                    # iniciar parede
                    wall_start = swizzle(x, y)
                    wall_length = 0
                    prev_empty = False
                else:
                    # aumentar parede
                    wall_length += 1
            else:
                if not prev_empty:
                    # encerrar parede
                    wall = Wall(start=wall_start, end=swizzle(x - 1, y))
                    walls.append(wall)
                prev_empty = True
        # Ao final de cada linha, se a parede não foi encerrada, encerrar
        if not prev_empty:
            # não subtrair 1 de x pois estamos no final da sala
            wall = Wall(start=wall_start, end=swizzle(x, y))
            walls.append(wall)
    return walls


def get_best_walls(tiles: TileGrid, export_img: bool = True) -> List[Wall]:
    # don't modify the original tiles
    tiles = [[Tile(tile) for tile in row] for row in tiles]

    horizontal = generate_walls(tiles, vertical=False)
    vertical = generate_walls(tiles, vertical=True)

    all_walls = horizontal + vertical
    all_walls_sorted = sorted(all_walls, key=lambda w: w.length, reverse=True)

    best_walls: List[Wall] = []
    remaining_tiles = sum((sum(row) for row in tiles))
    frames: List[Image.Image] = [generate_img_rectangles([], tiles)]
    for wall in all_walls_sorted:
        x1, y1 = wall.start
        x2, y2 = wall.end
        # If all tiles of this wall are already covered, skip it
        wall_needed = False
        if y1 == y2:
            # horizontal
            for x in range(x1, x2 + 1):
                tile = tiles[y1][x]
                if tile == Tile.TILE:
                    wall_needed = True
                    tiles[y1][x] = Tile.EMPTY
                    remaining_tiles -= 1
        elif x1 == x2:
            # vertical
            for y in range(y1, y2 + 1):
                tile = tiles[y][x1]
                if tile == Tile.TILE:
                    wall_needed = True
                    tiles[y][x1] = Tile.EMPTY
                    remaining_tiles -= 1
        if wall_needed:
            best_walls.append(wall)

            if export_img:
                img = generate_img_rectangles(best_walls, tiles, highlight_last=True)

                frames.append(img)
            # print(
            #     f"Parede #{len(best_walls):2} | Comprimento: {wall.length:2} | Tiles restantes: {remaining_tiles:3}"
            # )

        if remaining_tiles == 0:
            break

    if export_img:
        frames[0].save(
            "best_walls.png",
            format="png",
            append_images=frames[1:],
            # save_all=True,
            # duration=150,
            # loop=0,
        )

    return best_walls


def main():
    tiles = load_tiles_from_img("tiles.png")
    walls = get_best_walls(tiles, export_img=True)
    img = generate_img_rectangles(walls, tiles)
    img.save("walls_rect.png")

    wall_count_before = sum((sum(row) for row in tiles))
    wall_count_after = len(walls)
    percent_reduction = 100 - (wall_count_after / wall_count_before) * 100


# print("")
#  print(f"Before: {wall_count_before} walls")
# print(f"After: {wall_count_after} walls (-{percent_reduction:.1f}%)")


if __name__ == "__main__":
    main()
