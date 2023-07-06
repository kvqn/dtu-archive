from .create_migration import create_migration
from .. import subparsers

rollnos_parser = subparsers.add_parser("rollnos", help="Utility for roll numbers")


rollnos_subparsers = rollnos_parser.add_subparsers(help="Subcommands for roll numbers", dest="rollnos_subcommand", required=True)

create_migration_parser = rollnos_subparsers.add_parser("create-migration", help="Create a migration for roll numbers")
create_migration_parser.add_argument("rollnos_json", help="JSON file containing roll numbers")

def main(args):
    if args.rollnos_subcommand == "create-migration":
        create_migration(args.rollnos_json)


