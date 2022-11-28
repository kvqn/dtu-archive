import argparse

parser = argparse.ArgumentParser("cgpa", description="A tool to parse and analyze CGPA from the PDFs provided by the college.")

subparsers = parser.add_subparsers(dest="command", help="The command to run.", required=True, title="commands", metavar="command")

commands = {}

commands["extract-text"] = subparsers.add_parser("extract-text", help="Extract text from the PDF")
commands["extract-text"].add_argument("pdf", help="The PDF file to extract text from")
commands["extract-text"].add_argument("--output", "-o", help="The file to write the extracted text to", required=False)

commands["declutter"] = subparsers.add_parser("declutter", help="Declutter the text")
commands["declutter"].add_argument("input", help="The file to read the text from")
commands["declutter"].add_argument("--output", "-o", help="The file to write the decluttered text to", required=False)

# commands["to-csv"] = subparsers.add_parser("to-csv", help="Convert the text to CSV")
# commands["to-csv"].add_argument("input", help="The file to read the text from")
# commands["to-csv"].add_argument("output", "-o", help="The file to write the CSV to", required=False)

def parse_input():
    
    args = parser.parse_args()
    
    match args.command:

        case "extract-text":
            if args.output is None:
                args.output = args.pdf.replace(".pdf", ".txt")
            from .extract_text import extract_text
            extract_text(args.pdf, args.output)
            print("Next step is to declutter the text. Run `cgpa declutter` to declutter the text.")
        
        case "declutter":
            if args.output is None:
                args.output = args.input.replace(".txt", ".decluttered.txt")
            from .declutter import declutter
            declutter(args.input, args.output)
            print("Next step is csv/excel conversion. Run `cgpa to-csv` to convert the text to CSV.")
        

            