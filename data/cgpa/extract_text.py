import pdfplumber
import sys

def extract_text(pdf_path : str, y_density : int, save_path : str | None = None):
    with pdfplumber.open(pdf_path) as pdf:
            i = 0
            total_pages = len(pdf.pages)
            final_text = ""
            for page in pdf.pages:
                i+=1
                sys.stdout.write(f"\rProcessing Page [{i}/{total_pages}]")
                sys.stdout.flush()
                # print(i)
                text = page.extract_text(layout=True, y_density=y_density)
                final_text += text
            sys.stdout.write(f"\rProcessed Pages [{total_pages}/{total_pages}]\n")
            sys.stdout.flush()

    if save_path:
        with open(save_path, "w") as file:
            file.write(final_text)
    return final_text

def extract_text_and_save(pdf_path : str, output_path : str, y_density : int):
    final_text = extract_text(pdf_path, y_density)
    with open(output_path, "w") as file:
        file.write(final_text)
    print(f"Successfully extracted text from PDF. Output saved at {output_path}.\n")
