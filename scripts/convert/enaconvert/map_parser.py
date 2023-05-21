import os
from enum import Enum
from typing import List, Sequence, TextIO, Tuple, TypeVar, Union
from xml.etree import ElementTree

from .data import E3Map, Grid

PathLike = Union[str, bytes, os.PathLike]

T = TypeVar("T")

namespaces = {"xhtml": "http://www.w3.org/1999/xhtml"}


class LAYERS(Enum):
    FLOOR = "floor"
    WALLS = "walls"
    DOOR_AND_WINDOWS = "door_and_windows"
    FURNITURE = "furniture"
    UTENSILS = "utensils"
    ELETRONICS = "eletronics"
    INTERACTIVE_ELEMENTS = "interactive_elements"
    PERSONS = "persons"


class Parser:
    def __init__(self, buff: TextIO):
        self.map = E3Map((0, 0), [], [], [], [], [], [], [], [])
        # xml object
        self.root = ElementTree.fromstring(buff.read())

    def parse(self):
        """Parse the map file and return a map object."""
        self.map.size = self._parse_size()
        for key in [l.value for l in LAYERS]:
            setattr(self.map, key, self._parse_layer(key))

        return self.map

    def _parse_size(self) -> Tuple[int, int]:
        """Get the size of the canvas in pixels."""
        # get the canvas element
        canvas = self.root.find("xhtml:canvas", namespaces)
        if canvas is None:
            raise Exception("Canvas not found")

        # get the width and height attributes
        width = canvas.get("width")
        height = canvas.get("height")
        if width is None or height is None:
            raise Exception("Canvas width or height not found")

        return int(width), int(height)

    def _parse_layer(self, key: str) -> Grid:
        """Parse XML element corresponding to `key` and return a list of tiles."""
        # Get the layer tag where the name is `key`
        layer = self._get_layer(key)

        # Get the inner layer data
        data = layer.text
        if data is None:
            return [[]]
        data = data.replace("\n", "").strip()

        # Split the data into a list of tiles
        tiles = split_sequence(data.split(","), self.map.width // 32)
        return tiles

    def _get_layer(self, key: str) -> ElementTree.Element:
        """Get the layer tag where the name is `key`."""
        layer = self.root.find(f".//xhtml:layer[@name='{key}']", namespaces)
        if layer is None:
            raise Exception(f"Layer {key} not found")
        return layer


def read_file(path: PathLike) -> E3Map:
    """Read a XML file and return an `E3Map` object."""
    with open(path, "r") as f:
        return Parser(f).parse()


def split_sequence(sequence: Sequence[T], n: int) -> List[List[T]]:
    """Split a `sequence` into a list of lists of size `n`."""
    return [list(sequence[i : i + n]) for i in range(0, len(sequence), n)]


if __name__ == "__main__":
    from pathlib import Path

    map = read_file(Path("examples", "map.xml"))
    # print(map)
