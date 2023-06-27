import argparse

parser = argparse.ArgumentParser("cgpa", description="A tool to parse and analyze CGPA from the PDFs provided by the college.")

subparsers = parser.add_subparsers(dest="command", help="The command to run.", required=True, title="commands", metavar="command")

commands = {}

commands["extract-text"] = subparsers.add_parser("extract-text", help="Extract text from the PDF")
commands["extract-text"].add_argument("pdf", help="The PDF file to extract text from")
commands["extract-text"].add_argument("--output", "-o", help="The file to write the extracted text to", required=False)
commands["extract-text"].add_argument("--y-density", "-y", help="The y-density of the PDF. This adjusts how many white pixels make up a space or newline character. Default is 10", type=int, required=False, default=12)

commands["declutter"] = subparsers.add_parser("declutter", help="Declutter the text")
commands["declutter"].add_argument("input", help="The file to read the text from")
commands["declutter"].add_argument("--output", "-o", help="The file to write the decluttered text to", required=False)

commands["parse"] = subparsers.add_parser("parse", aliases=["extract-students"], help="Parse the decluttered text")
commands["parse"].add_argument("input", help="The file to read the decluttered text from")
commands["parse"].add_argument("--output", "-o", help="The file to write the parsed data to", required=False)

# commands["to-csv"] = subparsers.add_parser("to-csv", help="Convert the text to CSV")
# commands["to-csv"].add_argument("input", help="The file to read the text from")
# commands["to-csv"].add_argument("output", "-o", help="The file to write the CSV to", required=False)

commands["to-excel"] = subparsers.add_parser("to-excel", help="Convert the JSON to Excel")
commands["to-excel"].add_argument("input", help="The file to read the JSON from")
commands["to-excel"].add_argument("--output", "-o", help="The file to write the Excel to", required=False)

commands["complete"] = subparsers.add_parser("complete", help="Complete the process in one go")
commands["complete"].add_argument("pdf", help="The PDF file to extract text from")
commands["complete"].add_argument("semester", help="Which semester is this", type=int)
commands["complete"].add_argument("--output", "-o", help="The file to write the Excel to", required=False)
commands["complete"].add_argument("--y-density", "-y", help="The y-density of the PDF. This adjusts how many white pixels make up a space or newline character. Default is 10", type=int, required=False, default=12)
commands["complete"].add_argument("--make-intermediate-files", help="Make intermediate files", action="store_true", default=False)
commands["complete"].add_argument("--text", help="the file provided is a text file", action="store_true", default=False)
commands["complete"].add_argument("--excel", help="Create excel", action="store_true", default=False)
# commands["complete"].add_argument("--heirarchy", help="The heirarchy of the students", choices=["latest", "oldest"], default="latest")
commands["complete"].add_argument("--push", help="Push to db", action="store_true", default=False)
heirarchy = commands["complete"].add_mutually_exclusive_group(required=False)
heirarchy.add_argument("--latest", help="Use the latest result", dest="heirarchy", action="store_const", const="latest")
heirarchy.add_argument("--oldest", help="Use the oldest result", dest="heirarchy", action="store_const", const="oldest")

# This is better to do with a config file because there will a lot of options
commands["create-sem-result"] = subparsers.add_parser("create-sem-result", help="Create a result according to the specified config file.")
commands["create-sem-result"].add_argument("--config", "-c", help="The config file to use", default="result.toml", required=False)
commands["create-sem-result"].add_argument("--quiet", "-q", help="Don't print anything except errors to the console", action="store_true", required=False)

commands["create-aggregate-result"] = subparsers.add_parser("create-aggregate-result", help="Create an aggregate result according to the semester results in the subfolders")
commands["create-aggregate-result"].add_argument("--quiet", "-q", help="Don't print anything except errors to the console", action="store_true", required=False)

commands["list-subjects"] = subparsers.add_parser("list-subjects", help="List the subjects in the semester result for the filtered students.")
commands["list-subjects"].add_argument("--config", "-c", help="The config file to use", default="result.toml", required=False)


def cli_main():

    args = parser.parse_args()

    match args.command:

        case "extract-text":
            if args.output is None:
                args.output = args.pdf.replace(".pdf", ".txt")
            from .extract_text import extract_text_and_save
            extract_text_and_save(args.pdf, args.output, args.y_density)
            print("Next step is to declutter the text. Run `cgpa declutter` to declutter the text.")

        case "declutter":
            if args.output is None:
                args.output = args.input.replace(".txt", ".decluttered.txt")
            from .declutter import declutter_and_save
            declutter_and_save(args.input, args.output)
            print("Next step is to parse the text. Run `cgpa parse` to parse the text.")

        case "parse":
            if args.output is None:
                if args.input.endswith(".decluttered.txt"):
                    args.output = args.input.replace(".decluttered.txt", ".json")
                else:
                    args.output = args.input.replace(".txt", ".json")
            from .extract_students import extract_students_and_save
            extract_students_and_save(args.input, args.output)

        case "to-excel":
            if args.output is None:
                args.output = args.input.replace(".json", ".xlsx")
            from .excel import to_excel_from_json
            to_excel_from_json(args.input, args.output)
            print("Done!")

        case "complete":
            if args.output is None:
                args.output = args.pdf.replace(".pdf", ".xlsx")
            from .complete import complete_conversion
            if args.heirarchy is None:
                print("Please specify the heirarchy of the students. Use `--latest` or `--oldest`")
                exit(1)
            complete_conversion(args.pdf, args.output, args.y_density, args.make_intermediate_files, args.text, args.semester, args.heirarchy, args.push, args.excel)

        case "create-sem-result":
            from .create_sem_result import create_sem_result
            create_sem_result(args)

        case "create-aggregate-result":
            from .create_aggregate_result import create_aggregate_result
            create_aggregate_result(args)

        case "list-subjects":
            from .list_subjects import list_subjects
            list_subjects(args)






