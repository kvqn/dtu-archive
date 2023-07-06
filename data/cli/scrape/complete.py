from .extract_text import extract_text
from .declutter import declutter
from .extract_students import extract_students, save_students
# from .push_to_db import push_to_db


def complete_conversion(pdf_path : str, y_density, make_intermediate_files : bool, text: bool):
    # result_name = path.basename(pdf_path).replace(".pdf", "").replace(".txt", "")
    result_path_without_extension = pdf_path.replace(".pdf", "").replace(".txt", "")
    if text:
        with open(pdf_path, "r") as file:
            extracted_text = file.read()
    else:
        extracted_text = extract_text(pdf_path, y_density, result_path_without_extension + '.txt' if make_intermediate_files else None)
    decluttered_text = declutter(extracted_text, result_path_without_extension + '.decluttered.txt' if make_intermediate_files else None)
    students = extract_students(decluttered_text)
    if make_intermediate_files:
        json_output_path = result_path_without_extension + '.json'
        save_students(*students, json_output_path)

    return students

