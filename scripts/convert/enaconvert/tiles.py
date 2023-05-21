import importlib.resources as pkg_resources
import json
from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, Generator, List, Optional, Tuple

__all__ = ["ALL_PROPS", "Category", "Prop"]


Size = Tuple[int, int]


class Category(Enum):
    FLOOR = "floor"
    WALL = "wall"
    DOOR_WINDOW = "doorwindow"
    FURNITURE = "furniture"
    ELECTRONICS = "eletronics"
    UTENSILS = "utensils"
    GOALS = "goals"
    PLAYER = "persons"


@dataclass
class Prop:
    name: str
    category: Category
    code: str
    size: Tuple[int, int]
    anchor_codes: List[str] = field(default_factory=list)
    anchor_size: Optional[Tuple[int, int]] = None


def parse_codes(codes_list: str) -> Generator[Tuple[str, List[str]], None, None]:
    for codes in codes_list.split("|"):
        # If it has a space is a source code with anchor codes
        if "(" in codes:
            source_code, anchor_codes = codes.split(" ")
            anchor_codes = anchor_codes.replace("(", "").replace(")", "").split(",")
        else:
            source_code = codes
            anchor_codes = []
        yield source_code, anchor_codes


def parse_size_str(size: str) -> Size:
    return tuple(int(x) for x in size.split("x"))


def parse_size(data: str) -> Tuple[Size, Optional[Size]]:
    data = data.strip()
    if "(" not in data:
        source_size = parse_size_str(data)
        return source_size, None
    else:
        source_size, anchor_size = data.split(" ")
        anchor_size = anchor_size.replace("(", "").replace(")", "")
        source_size = parse_size_str(source_size)
        anchor_size = parse_size_str(anchor_size)
        return source_size, anchor_size


def parse_props(all_props: List[Dict[str, str]]) -> List[Prop]:
    props = []
    for prop in all_props:
        name = prop["nome"]
        category = Category(prop["camada"].lower())
        size, anchor_size = parse_size(prop["tamanho"])

        codes_list = parse_codes(prop["codigo"])
        for source_code, anchor_codes in codes_list:
            props.append(
                Prop(
                    name=name,
                    category=category,
                    code=source_code,
                    size=size,
                    anchor_codes=anchor_codes,
                    anchor_size=anchor_size,
                )
            )
    return props


def parse_props_from_file(path: str) -> List[Prop]:
    content = pkg_resources.read_text(__package__, path)
    data = json.loads(content)["data"]
    return parse_props(data)


def props_by_category(prop_list: List[Prop]) -> Dict[Category, Prop]:
    categories = {}
    for prop in prop_list:
        category = prop.category
        if category not in categories:
            categories[category] = []
        categories[category].append(prop)
    return categories


ALL_PROPS = parse_props_from_file("tiles.json")
PROPS_BY_CATEGORY = props_by_category(ALL_PROPS)

VOID_ID = "-1"


if __name__ == "__main__":
    props = ALL_PROPS

    # picking a random prop
    from random import choice

    # print(str(choice(props)) + "\n\n")

    # create a json with all props by category
    with open("all_tiles_by_category.json", "w", encoding="utf-8") as f:
        json.dump(props, f, indent=4, ensure_ascii=False, default=lambda x: str(x))
