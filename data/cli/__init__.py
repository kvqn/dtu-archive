import argparse

parser = argparse.ArgumentParser(description='DTU Archive CLI')

subparsers = parser.add_subparsers(dest="command", help="The command to run.", required=True, title="commands", metavar="command")

from .scrape import cli_main as scrape_main
from .migration.cli import main as migration_main

def main():
    args = parser.parse_args()
    if args.command == "scrape":
        scrape_main(args)
    elif args.command == "migrations" or args.command == "migration":
        migration_main(args)
    else:
        parser.print_help()
