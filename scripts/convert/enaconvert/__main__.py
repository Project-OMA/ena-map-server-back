import argparse

from .converter import MapFile


def main():
    parser = argparse.ArgumentParser(
        prog="ENAConvert",
        description="A tool to convert E3 maps to ENA-optimized maps",
    )
    parser.add_argument("source", help="Map file to convert (*.xml)")
    parser.add_argument("output", help="Output file (*.json)")
    parser.add_argument(
        "--minify", "-m", action="store_true", help="Minify the output JSON"
    )
    args = parser.parse_args()

    file = MapFile.from_xml(args.source)
    file.to_file(args.output, minify=args.minify)


if __name__ == "__main__":
    main()
