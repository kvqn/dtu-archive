import logging
from .extract_text import extract_text
from .declutter import declutter
from .extract_students import extract_students, save_students
from .excel import to_excel
from .push_to_db import push_to_db
import os.path as path


def complete_conversion(pdf_path : str, output_path : str, y_density, make_intermediate_files : bool, text: bool, semsester: int, heirarchy: str, push: bool, excel: bool):
    result_name = path.basename(pdf_path).replace(".pdf", "").replace(".txt", "")
    if text:
        with open(pdf_path, "r") as file:
            extracted_text = file.read()
    else:
        extracted_text = extract_text(pdf_path, y_density, result_name + '.txt' if make_intermediate_files else None)
    decluttered_text = declutter(extracted_text, result_name + '.decluttered.txt' if make_intermediate_files else None)
    students = extract_students(decluttered_text)
    if make_intermediate_files:
        json_output_path = result_name + '.json'
        save_students(*students, json_output_path)
    if excel:
        excel_output_path = result_name + '.xlsx'
        to_excel(*students, excel_output_path)

    if push:
        push_to_db(result_name, students[0], semsester, heirarchy)

