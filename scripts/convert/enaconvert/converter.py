import json
import os
from dataclasses import dataclass
from typing import Callable, Dict, Generator, List, Sequence, Tuple, Union

from .data import E3Map, Grid, Map, Object, Tile, TileGrid, TileID
from .floor import generate_floors
from .map_parser import read_file as e3_read_file
from .tiles import PROPS_BY_CATEGORY, VOID_ID, Category
from .walls import get_best_walls
from .image import generate_full_map_img_rectangles

__all__ = ["MapFile", "convert_map", "convert_file"]


PathLike = Union[str, bytes, os.PathLike]

LAYERS = Category.__members__.values()


@dataclass
class MapFile:
    """A JSON file representing a `Map` object."""

    data: Map

    @classmethod
    def from_xml(cls, path: PathLike) -> "MapFile":
        # Aplicar tradução de formatos
        return cls.from_e3map(e3_read_file(path))

    @classmethod
    def from_e3map(cls, source: E3Map) -> "MapFile":
        return MapFile(convert_map(source))

    def to_file(self, path: PathLike, minify: bool = True) -> None:
        with open(path, "w") as f:
            json.dump(
                self.to_dict(),
                f,
                indent=4 if not minify else None,
                separators=(",", ": ") if not minify else None,
                default=lambda x: x.to_dict(),
            )

    def to_json(self) -> str:
        return json.dumps(self.to_dict())

    def to_dict(self) -> Dict[str, object]:
        return {
            "size": self.data.size,
            "layers": self.data.layers,
        }


def convert_map(source: E3Map) -> Map:
    """Convert an `E3Map` to an optimized `TranslatedMap`."""
    return Map(size=convert_size(source.size), layers=convert_layers(source))


def convert_size(size: Tuple[int, int]) -> Tuple[int, int]:
    return size[0] // 32, size[1] // 32


def convert_layers(source: E3Map) -> Dict[str, List[Tile]]:
    convert_obj = convert_objects_to_list
    layers = {}
    layers["walls"] = convert_walls(source.walls)
    layers["floors"] = convert_floors(source.floor)
    layers["door_and_windows"] = convert_obj(
        source.door_and_windows, Category.DOOR_WINDOW
    )
    layers["furniture"] = convert_obj(source.furniture, Category.FURNITURE)
    layers["utensils"] = convert_obj(source.utensils, Category.UTENSILS)
    layers["eletronics"] = convert_obj(source.eletronics, Category.ELECTRONICS)
    layers["goals"] = convert_obj(source.interactive_elements, Category.GOALS)
    layers["persons"] = convert_obj(source.persons, Category.PLAYER)
    return layers


def convert_walls(layer: Grid) -> List[Tile]:
    return list(apply_tile_conversion(layer, get_best_walls))


def convert_floors(layer: Grid) -> List[Tile]:
    return list(apply_tile_conversion(layer, generate_floors))


def apply_tile_conversion(
    layer: Grid, func: Callable[[TileGrid], Sequence[Tile]]
) -> Generator[Tile, None, None]:
    for material, tiles in split_materials(layer).items():
        # print(f"\n--------- Material: {material} ---------")
        if material == TileID.EMPTY:
            continue
        for tile in func(tiles):
            yield Tile(start=tile.start, end=tile.end, type=material)


def convert_objects(layer: Grid, category: Category) -> Generator[Object, None, None]:
    props = PROPS_BY_CATEGORY[category]
    anchor_ids = [prop.code for prop in props]

    # print(f"\n--------- Camada: {category.value} ---------")
    for y in range(len(layer)):
        for x in range(len(layer[y])):
            id = layer[y][x]
            if id in anchor_ids:
                # print(f"Objeto {id} em ({x}, {y})")
                yield Object(pos=(x, y), type=id)


def convert_objects_to_list(layer: Grid, category: Category) -> List[Object]:
    return list(convert_objects(layer, category))


def split_materials(layer: Grid) -> Dict[str, TileGrid]:
    """Split a layer of the map into its different materials."""

    materials = {}

    for y, row in enumerate(layer):
        for x, tile in enumerate(row):
            if tile != VOID_ID:
                if tile not in materials:
                    materials[tile] = [
                        [TileID.EMPTY] * len(layer[0]) for _ in range(len(layer))
                    ]
                materials[tile][y][x] = TileID.TILE

    return materials


def convert_file(src: PathLike, dst: PathLike, minify: bool = True) -> None:
    """Convert a XML map file from E3 to an ENA-optimized JSON file."""

    MapFile.from_xml(src).to_file(dst, minify=minify)


if __name__ == "__main__":
    file = MapFile.from_xml("maps/map.xml")
    file.to_file("map.json", minify=False)
    map = file.data

    assert map.size == (25, 15)
    assert len(map.layers["walls"]) == 4
    assert len(map.layers["floors"]) == 3
    assert len(map.layers["door_and_windows"]) == 3
    assert len(map.layers["furniture"]) == 4
    assert len(map.layers["eletronics"]) == 3
    assert len(map.layers["utensils"]) == 2
    assert len(map.layers["goals"]) == 1
    assert len(map.layers["persons"]) == 1
