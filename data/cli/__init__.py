import argparse

parser = argparse.ArgumentParser(description='DTU Archive CLI')

subparsers = parser.add_subparsers(dest="command", help="The command to run.", required=True, title="commands", metavar="command")

from .scrape import cli_main as scrape_main

def main():
    args = parser.parse_args()
    if args.command == "scrape":
        scrape_main(args)
    else:
        parser.print_help()
