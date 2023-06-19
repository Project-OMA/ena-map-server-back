from typing import List, Sequence

from PIL import Image, ImageDraw

from .data import Piece, TileGrid


def generate_img_rectangles(
    pieces: Sequence[Piece],
    tilemap: TileGrid,
    scale: int = 16,
    highlight_last: bool = False,
) -> Image.Image:
    # generate image from the tiles
    width = len(tilemap[0]) * scale
    height = len(tilemap) * scale
    img = Image.new("RGBA", (width, height), color=(255, 255, 255, 1))
    draw = ImageDraw.Draw(img)
    for piece in pieces:
        x1 = piece.start[0] * scale
        y1 = piece.start[1] * scale
        x2 = piece.end[0] * scale + scale - 1
        y2 = piece.end[1] * scale + scale - 1
        if highlight_last:
            if piece is pieces[-1]:
                alpha = 255
            else:
                alpha = 128
        else:
            alpha = 255

        draw.rectangle(
            (x1, y1, x2, y2),
            fill=(alpha, 0, 0, 255),
            outline=(0, 0, 0, 255),
        )
    return img


def generate_full_map_img_rectangles(
    floor: Sequence[Piece],
    walls: Sequence[Piece],
    size,
    scale: int = 16,
) -> Image.Image:
    # generate image from the tiles
    width = size[0] * scale
    height = size[1] * scale

    img = Image.new("RGBA", (width, height), color=(255, 255, 255, 0))
    draw = ImageDraw.Draw(img)

    for piece in floor:
        x1 = piece.start[0] * scale
        y1 = piece.start[1] * scale
        x2 = piece.end[0] * scale + scale - 1
        y2 = piece.end[1] * scale + scale - 1

        draw.rectangle(
            (x1, y1, x2, y2),
            fill=(48, 172, 65, 255),
            outline=(0, 0, 0, 0),
        )

    for piece in walls:
        x1 = piece.start[0] * scale
        y1 = piece.start[1] * scale
        x2 = piece.end[0] * scale + scale - 1
        y2 = piece.end[1] * scale + scale - 1

        draw.rectangle(
            (x1, y1, x2, y2),
            fill=(163, 137, 104, 255),
            outline=(0, 0, 0, 0),
        )
    return img
