import pdfplumber
import sys

def extract_text(pdf_path : str, output_path : str):
    with pdfplumber.open(pdf_path) as pdf:
        with open(output_path, "w") as file:
            i = 0
            total_pages = len(pdf.pages)
            for page in pdf.pages:
                i+=1
                sys.stdout.write(f"\rProcessing Page [{i}/{total_pages}]")
                sys.stdout.flush()
                # print(i)
                text = page.extract_text(layout=True, y_density=10)
                file.write(text)
            sys.stdout.write(f"\rProcessed Pages [{total_pages}/{total_pages}]\n")
        sys.stdout.write(f"Successfully extracted text from PDF. Next step is to declutter.\n")
        sys.stdout.write(f"cgpa declutter {output_path}\n")
        sys.stdout.flush()