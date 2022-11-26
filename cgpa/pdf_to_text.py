from . import Paths
import pdfplumber

def pdf_to_text():
    with pdfplumber.open(Paths.PDF) as pdf:
        with open(Paths.TEXT, "w") as file:
            i = 0
            for page in pdf.pages:
                i+=1
                print(i)
                text = page.extract_text(layout=True, y_density=10)
                file.write(text)