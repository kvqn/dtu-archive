import json
from . import Student
import logging
import xlsxwriter
import re
from typing import List

    
class Worksheet:

    def __init__(self, worksheet : xlsxwriter.workbook.Worksheet):
        self.worksheet = worksheet
        self.column_widths = {}
    
    def write(self, row, column, data, *args, **kwargs):
        self.worksheet.write(row, column, data, *args, **kwargs)
        self.column_widths[column] = max(self.column_widths.get(column, 0), len(str(data)))
    
    def set_column_widths(self):
        for column, width in self.column_widths.items():
            self.worksheet.set_column(column, column, width+1)


class Workbook(xlsxwriter.Workbook):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.my_worksheets = {}
    
    def add_worksheet(self, name):
        worksheet = Worksheet(super().add_worksheet(name))
        self.my_worksheets[name] = worksheet
        return worksheet
    
    def set_column_widths(self):
        for worksheet in self.my_worksheets.values():
            worksheet.set_column_widths()
    


def to_excel(students : List[Student], N_SUBJECT_COLUMNS_REQUIRED, output_path : str):
    
    
    workbook = Workbook(output_path)

    # Creating all worksheet
    all_worksheet = workbook.add_worksheet("All")

    all_worksheet.write(0, 0, "Roll No.")
    all_worksheet.write(0, 1, "Name")

    for i in range(N_SUBJECT_COLUMNS_REQUIRED):
        all_worksheet.write(0, 2 + i*2, f"Subject {i + 1}")
        all_worksheet.write(0, 2 + i*2 + 1, f"Grade {i + 1}")
    
    all_worksheet.write(0, 2 + N_SUBJECT_COLUMNS_REQUIRED*2, "Total Credits")
    all_worksheet.write(0, 2 + N_SUBJECT_COLUMNS_REQUIRED*2 + 1, "CGPA")
    all_worksheet.write(0, 2 + N_SUBJECT_COLUMNS_REQUIRED*2 + 2, "Failed Papers")

    for i, student in enumerate(students):
        all_worksheet.write(i + 1, 0, student.rollno)
        all_worksheet.write(i + 1, 1, student.name)

        for j, (subject, grade) in enumerate(student.grades.items()):
            all_worksheet.write(i + 1, 2 + j*2, subject)
            all_worksheet.write(i + 1, 2 + j*2 + 1, grade)
        
        all_worksheet.write(i + 1, 2 + N_SUBJECT_COLUMNS_REQUIRED*2, student.tc)
        all_worksheet.write(i + 1, 2 + N_SUBJECT_COLUMNS_REQUIRED*2 + 1, student.cgpa)
        all_worksheet.write(i + 1, 2 + N_SUBJECT_COLUMNS_REQUIRED*2 + 2, student.failed_papers)

    
    # Creating individual worksheet

    WORKSHEETS = {}

    for student in students:
        match = re.match(r"^2K[0-9]{2}/([A-Z][0-9]+)/[0-9]+$", student.rollno)
        if match:
            classname = match.group(1)
            if classname not in WORKSHEETS:
                worksheet = workbook.add_worksheet(classname)
                WORKSHEETS[classname] = worksheet
                worksheet.n_students = 0

                worksheet.write(0, 0, "Roll No.")
                worksheet.write(0, 1, "Name")

                for i in range(N_SUBJECT_COLUMNS_REQUIRED):
                    worksheet.write(0, 2 + i*2, f"Subject {i + 1}")
                    worksheet.write(0, 2 + i*2 + 1, f"Grade {i + 1}")
                    
                worksheet.write(0, 2 + N_SUBJECT_COLUMNS_REQUIRED*2, "Total Credits")
                worksheet.write(0, 2 + N_SUBJECT_COLUMNS_REQUIRED*2 + 1, "CGPA")
                
            else:
                worksheet = WORKSHEETS[classname]
            
            worksheet.n_students += 1
            
            worksheet.write(worksheet.n_students, 0, student.rollno)
            worksheet.write(worksheet.n_students, 1, student.name)
            
            for j, (subject, grade) in enumerate(student.grades.items()):
                worksheet.write(worksheet.n_students, 2 + j*2, subject)
                worksheet.write(worksheet.n_students, 2 + j*2 + 1, grade)
            
            worksheet.write(worksheet.n_students, 2 + N_SUBJECT_COLUMNS_REQUIRED*2, student.tc)
            worksheet.write(worksheet.n_students, 2 + N_SUBJECT_COLUMNS_REQUIRED*2 + 1, student.cgpa)
    
    workbook.set_column_widths()
    workbook.close()
    print("Excel file created successfully.")
        
def to_excel_from_json(input_path : str, output_path : str):
    # get students
    with open(input_path, "r") as f:
        data = json.load(f)

    N_SUBJECT_COLUMNS_REQUIRED = data["n_subject_columns_required"]
    
    students = []
    for student_data in data["students"]:
        students.append(Student.from_dict(student_data))
    
    to_excel(students, N_SUBJECT_COLUMNS_REQUIRED, output_path)

    
    
    

    
    