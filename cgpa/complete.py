import logging
from .extract_text import extract_text
from .declutter import declutter
from .extract_students import extract_students
from .excel import to_excel


def complete_conversion(pdf_path : str, output_path : str):
    text = extract_text(pdf_path)
    decluttered_text = declutter(text)
    students = extract_students(decluttered_text)
    to_excel(*students, output_path)