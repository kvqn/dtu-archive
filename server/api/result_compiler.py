import json
from typing import TypedDict, Callable
from .types import Student, CompiledResult
import os


class UnprocessedStudent(TypedDict):
    sno : int
    name : str
    rollno : str
    cgpa : float
    grades : dict[str, str]
    tc : int
    cgpa : float
    failed_papers : str


def convert_folder_names_to_json_paths(folder_names : list[str]) -> list[str]:
    """
    Converts the list of folder names to list of json paths.

    Args:
        folder_names: list of folder names

    Returns:
        list of json paths
    """

    BASE_PATH = '/home/kevqn/projects/cgpa-analysis/results/'

    json_paths = []

    for folder_name in folder_names:
        folder_path = os.path.join(BASE_PATH, folder_name)
        files = os.listdir(folder_path)
        for file in files:
            if file.endswith('.json'):
                json_paths.append(os.path.join(folder_path, file))
                break
        else:
            raise ValueError('No json file found in folder: ' + folder_name)

    return json_paths


def compile_students(students : list[UnprocessedStudent]) -> CompiledResult:
    """
    Compiles a list of UnprocessedStudent into a CompiledResult.
    Use this function at the last, after applying all filters and queries.

    Args:
        students: list[UnprocessedStudent]

    Returns:
        CompiledResult
    """

    subject_codes = set()

    for student in students:
        for code in student['grades'].keys():
            subject_codes.add(code)

    subject_codes = list(subject_codes)

    compiled_result = CompiledResult(
        subject_codes=subject_codes,
        students=[]
            )

    students.sort(key=lambda x: x['cgpa'], reverse=True)

    for index, student in enumerate(students):
        compiled_student = Student(
            rank=index+1,
            roll=student['rollno'],
            name=student['name'],
            cgpa=student['cgpa'],
            grades=[]
                )
        for code in subject_codes:
            compiled_student['grades'].append(student['grades'].get(code, '-'))
        compiled_result['students'].append(compiled_student)

    return compiled_result


def filter_students(students : list[UnprocessedStudent], check_function : Callable[ [ UnprocessedStudent ], bool ] ) -> list[UnprocessedStudent]:
    """
    Filters a list of UnprocessedStudent using a check_function.
    check_function should return True if the student is to be included in the result.

    Args:
        students: list[UnprocessedStudent]
        check_function: function that takes an UnprocessedStudent and returns a boolean

    Returns:
        list[UnprocessedStudent] : filtered list of students.
    """

    filtered_students = []

    for student in students:
        if check_function(student):
            filtered_students.append(student)

    return filtered_students


def compile_json_paths(json_paths : list[str], check_function : Callable[ [ UnprocessedStudent ], bool ] = lambda x: True) -> CompiledResult:
    """
    Compiles the result from various jsons (for the same term) into a single json.
    Accepts no queries.
    Return value ready for API.

    Args:
        results: list of json file paths

    Returns:
        CompiledResult
    """

    students = {}

    for path in json_paths:
        with open(path, 'r') as f:
            data = json.load(f)

        for student in data['students']:
            students[student['name']] = student

    students = list(students.values())

    students = filter_students(students, check_function)

    return compile_students(students)


