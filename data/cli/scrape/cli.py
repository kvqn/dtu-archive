from cli.scrape import excel
from .. import subparsers
import os


scrape_subparser = subparsers.add_parser("scrape", help="Scrape the result PDF in one go")

subcommands = scrape_subparser.add_subparsers(title="subcommands", dest="subcommand", required=True)

excel_subcommand = subcommands.add_parser("create-excel", help="Create excel from the scraped data")
excel_subcommand.add_argument("pdf", help="The PDF file to extract text from")
excel_subcommand.add_argument("--y-density", "-y", help="The y-density of the PDF. This adjusts how many white pixels make up a space or newline character. Default is 12", type=int, required=False, default=12)
excel_subcommand.add_argument("--make-intermediate-files", help="Make intermediate files", action="store_true", default=False)
excel_subcommand.add_argument("--text", help="the file provided is a text file", action="store_true", default=False)

make_migrations_subcommand = subcommands.add_parser("make-migrations", help="Make migrations for the scraped data")
make_migrations_subcommand.add_argument("pdf", help="The PDF file to extract text from")
make_migrations_subcommand.add_argument("semester", help="Which semester is this", type=int)
make_migrations_subcommand.add_argument("heirarchy", help="Use the latest result", choices=["latest", "oldest"], type=str)
make_migrations_subcommand.add_argument("--y-density", "-y", help="The y-density of the PDF. This adjusts how many white pixels make up a space or newline character. Default is 12", type=int, required=False, default=12)
make_migrations_subcommand.add_argument("--make-intermediate-files", help="Make intermediate files", action="store_true", default=False)
make_migrations_subcommand.add_argument("--text", help="the file provided is a text file", action="store_true", default=False)

def cli_main(args):
    from .complete import complete_conversion
    if args.subcommand == "create-excel":
        students = complete_conversion(args.pdf, args.y_density, args.make_intermediate_files, args.text)
        excel_output_path = args.pdf.replace(".pdf", ".xlsx")
        excel.to_excel(*students, excel_output_path)

    elif args.subcommand == "make-migrations":
        from .make_migration import make_migration
        students = complete_conversion(args.pdf, args.y_density, args.make_intermediate_files, args.text)
        semsester = args.semester
        heirarchy = args.heirarchy
        result_name = os.path.basename(args.pdf).replace(".pdf", "").replace(".txt", "")
        make_migration(result_name, students[0], semsester, heirarchy)






