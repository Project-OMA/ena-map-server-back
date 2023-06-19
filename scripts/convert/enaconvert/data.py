from dataclasses import dataclass
from enum import IntEnum
from typing import Dict, List, Optional, Protocol, Tuple


class Piece(Protocol):
    """Protocol representing an object that can be placed on the map."""

    start: Tuple[int, int]
    end: Tuple[int, int]


class TileID(IntEnum):
    """Enum with the internal representation of tiles for the
    box detection algorithms."""

    EMPTY = 0
    TILE = 1

    def __repr__(self) -> str:
        return str(self.value)


@dataclass
class Tile:
    """Base class for tiles of the map."""

    start: Tuple[int, int]
    end: Tuple[int, int]
    type: Optional[str] = None

    @property
    def x1(self) -> int:
        return self.start[0]

    @property
    def y1(self) -> int:
        return self.start[1]

    @property
    def x2(self) -> int:
        return self.end[0]

    @property
    def y2(self) -> int:
        return self.end[1]

    def to_dict(self) -> Dict:
        return {
            "type": self.type,
            "start": self.start,
            "end": self.end,
        }


@dataclass
class Wall(Tile):
    @property
    def length(self):
        if self.start[0] == self.end[0]:
            return self.end[1] - self.start[1] + 1
        elif self.start[1] == self.end[1]:
            return self.end[0] - self.start[0] + 1


@dataclass
class Floor(Tile):
    pass


@dataclass
class Object:
    """Class representing an object of the map."""

    pos: Tuple[int, int]
    type: str

    def to_dict(self) -> Dict:
        return {
            "pos": self.pos,
            "type": self.type,
        }


Grid = List[List[str]]
TileGrid = List[List[TileID]]


@dataclass
class E3Map:
    size: Tuple[int, int]
    floor: Grid
    walls: Grid
    door_and_windows: Grid
    furniture: Grid
    utensils: Grid
    eletronics: Grid
    interactive_elements: Grid
    persons: Grid

    @property
    def width(self):
        return self.size[0]

    @property
    def height(self):
        return self.size[1]


@dataclass
class Map:
    """Optimized E3 map representation."""

    size: Tuple[int, int]
    layers: Dict[str, List[Tile]]
