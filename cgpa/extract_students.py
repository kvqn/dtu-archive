from . import Student
from typing import List
import re
import logging
import json

class ParsingException(Exception):
    pass


def force_split(arg):
    if arg is None:
        return []
    return arg.split()

HANDLE_NAMELESS_ENTRIES = True


def extract_students(input_path : str, output_path : str):
    STUDENTS : List[Student] = []
    with open(input_path, "r") as file:
        lines = iter(file.readlines())
    try:
        line_number = 0
        STUDENTS = []
        DONT_READ_LINE = False
        while True:
            # Expecting new table
            
            if not DONT_READ_LINE:
                while True:
                    line = next(lines)
                    line_number+=1
                    if not line.isspace():
                        break
            
            DONT_READ_LINE = False

            match = re.match(r"^ *Sr\.No +Name +Roll +No\. +(?P<subjects>(?:[A-Za-z]+[0-9]+ {,5})*) .*$", line)
            if not match:
                err = f"Expected table header, got something else."
                logging.error(err)
                raise ParsingException(err)
            subjects = match.group("subjects").split()
            # print(subjects)
            
            # Expecting students
            
            blank_lines = 0
            while True:
                
                line = next(lines)
                line_number+=1
                if line.isspace():
                    blank_lines+=1
                    continue
                
                blank_lines = 0

                student = Student(subjects)

                match = re.match(r"^ {,30}(?P<name>[A-Za-z\.]+(?: {1,3}[A-Za-z\.]+)*)?(?: {10,}(?P<failed_papers>[A-Z]+[0-9]+ *,?(?: *[A-Z]+[0-9]+(?: *,)?)*))? *$", line)
                if match:
                    student.name.extend(force_split(match.group("name")))
                    student.failed_papers.extend(force_split(match.group("failed_papers")))
                    line = next(lines)
                    line_number+=1

                match = re.match(r"^ *(?P<sno>[0-9]+)? +(?P<name>[A-Za-z\.]+(?: +[A-Za-z\.]+)*)? +(?P<rollno>2K[0-9]{2}/[A-Z][0-9]+/[0-9]+)? +(?P<grades>(?:[A-Z]|NULL)\+?(?: +(?:[A-Z]|NULL)\+?)*) +(?P<tc>[0-9]+) +(?P<cgpa>[0-9\.]+)(?: +(?P<failed_papers>[A-Z]+[0-9]+ *,?(?: *[A-Z]+[0-9]+(?: *,)?)*))? *$", line)
                if not match:
                    match = re.match(r"^ *Sr\.No +Name +Roll +No\. +(?P<subjects>(?:[A-Za-z]+[0-9]+ {,5})*) .*$", line)
                    if not match:
                        err = f"Error: Expected student line or table header, but got something else."
                        logging.error(err)
                        raise ParsingException(err)
                    else:
                        DONT_READ_LINE = True
                        break

                if match.group("sno") is None:
                    logging.info(f"Nameless student at line {line_number}")
                student.sno = match.group("sno")
                student.name.extend(force_split(match.group("name")))
                student.rollno = match.group("rollno")
                student.grades = match.group("grades").split()
                student.tc = match.group("tc")
                student.cgpa = match.group("cgpa")
                student.failed_papers.extend(force_split(match.group("failed_papers")))

                # QOL checks
                
                if len(student.grades) != len(subjects):
                    err = f"Warning (line {line_number}): Number of grades ({len(student.grades)}) does not match number of subjects ({len(subjects)})."
                    logging.warning(err)
                    

                line = next(lines)
                line_number+=1
                if line.isspace():
                    blank_lines+=1
                else:
                    match = re.match(r"^ {,30}(?P<name>[A-Za-z]+(?: {1,3}[A-Za-z]+)*)(?: {10,}(?P<failed_papers>[A-Za-z]+(?: {1,3}[A-Za-z]+)*))? *$", line)
                    if match:
                        student.name.extend(force_split(match.group("name")))
                        student.failed_papers.extend(force_split(match.group("failed_papers")))
                
                STUDENTS.append(student)
    except StopIteration:
        pass
    except Exception as e:
        err = f"Error at line {line_number}"
        logging.error(err)
        print(err)
        raise e

    data = []
    N_SUBJECT_COLUMNS_REQUIRED = 0
    for student in STUDENTS:
        N_SUBJECT_COLUMNS_REQUIRED = max(N_SUBJECT_COLUMNS_REQUIRED, len(student.grades))
        student.finalize()
        data.append(student.to_dict())
    
    with open(output_path, "w") as file:
        json.dump(data, file, indent=4)

    print(f"Extracted {len(STUDENTS)} students. Output saved to {output_path}.")
    print(f"Number of subject columns required: {N_SUBJECT_COLUMNS_REQUIRED}")