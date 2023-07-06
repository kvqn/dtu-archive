from .. import subparsers

migrations_parser = subparsers.add_parser("migrations", help="Manage migrations")

migrations_subparsers = migrations_parser.add_subparsers(help="Manage migrations", dest="migrations_command", required=True)

list_parser = migrations_subparsers.add_parser("list", help="List migrations")
apply_parser = migrations_subparsers.add_parser("apply", help="Apply migrations")
create_empty_parser = migrations_subparsers.add_parser("create-empty", help="Create empty migration")

def main(args):

    if args.migrations_command == "list":
        from .list_migrations import list_migrations
        list_migrations()

    elif args.migrations_command == "apply":
        from .apply_migrations import apply_migrations
        apply_migrations()

    elif args.migrations_command == "create-empty":
        from .create_empty_migration import create_empty_migration
        create_empty_migration()

    else:
        print("Unknown command")
        exit(1)





