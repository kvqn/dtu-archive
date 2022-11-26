import pdfplumber

def extract_text(pdf_path : str, output_path : str):
    with pdfplumber.open(pdf_path) as pdf:
        with open(output_path, "w") as file:
            i = 0
            for page in pdf.pages:
                i+=1
                print(i)
                text = page.extract_text(layout=True, y_density=10)
                file.write(text)