import sys
import os
import json
from io import StringIO
from typing import BinaryIO
from enaconvert.converter import MapFile
from enaconvert.map_parser import Parser
from fastapi import UploadFile
from enaconvert.image import generate_full_map_img_rectangles


def verify_xml(file) -> bool:
    if file["type"] == "application/xml" or file["type"] == "text/xml":
        return True
    else:
        raise IOError("File is not XML")


def convert_file_to_buffer(
    input: BinaryIO, output: StringIO, minify: bool, fileName: StringIO
) -> None:
    # Create StringIO from input to use as a file-like object
    string_io = StringIO(bytes(input["content"]["data"]).decode("utf-8"))
    e3_map = Parser(string_io).parse()
    map_file = MapFile.from_e3map(e3_map)

    # Convert to JSON string
    json_string = json.dumps(
        map_file,
        indent=4 if not minify else None,
        separators=(",", ": ") if not minify else None,
        default=lambda x: x.to_dict(),
    )

    img = generate_full_map_img_rectangles(
        map_file.data.layers["floors"],
        map_file.data.layers["walls"],
        map_file.data.size,
    )

    img.save(
        "./assets/img/" + fileName + ".png",
        format="png",
    )

    # Write to output buffer
    output.write(json_string)


def process_map(file, minify: bool = False, fileName: StringIO = ""):
    try:
        verify_xml(file)
        output = StringIO()
        convert_file_to_buffer(file, output, minify=minify, fileName=fileName)
        return output.getvalue()

    except Exception as e:
        raise IOError("Error while converting file") from e


if __name__ == "__main__":
    data = json.loads(str(sys.argv[1]))
    json = process_map(data["file"], data["minify"], data["fileName"])
    print("json converted: ", json)
