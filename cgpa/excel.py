import json
from . import Student
import logging
import xlsxwriter


def to_excel(input_path : str, output_path : str):
    
    # get students
    with open(input_path, "r") as f:
        data = json.load(f)

    N_SUBJECT_COLUMNS_REQUIRED = data["n_subject_columns_required"]
    
    students = []
    for student_data in data["students"]:
        students.append(Student.from_dict(student_data))
    
    workbook = xlsxwriter.Workbook(output_path)

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

    workbook.close()

    

    
    
    

    
    