

PATH = "O21_BTECH_I_1446.pdf"
OUTPUT = "new_text.txt"

import pdfplumber

with pdfplumber.open(PATH) as pdf:
    with open(OUTPUT, "w") as file:
        i = 0
        for page in pdf.pages:
            i+=1
            print(i)
            text = page.extract_text(layout=True)
            file.write(text)