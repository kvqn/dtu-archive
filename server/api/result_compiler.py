import json
from typing import TypedDict
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




def compile_results(results : list[str]) -> CompiledResult:
    """
    Compiles the result from various jsons (for the same term) into a single json.
    Return value ready for API.

    Args:
        results: list of json file paths

    Returns:
        CompiledResult
    """

    students = {}
    subject_codes = set()

    for result in results:
        with open(result, 'r') as f:
            data = json.load(f)

        for student in data['students']:
            students[student['name']] = student

    for student in students.values():
        for code in student['grades'].keys():
            subject_codes.add(code)

    subject_codes = list(subject_codes)

    compiled_result = CompiledResult(
        subject_codes=subject_codes,
        students=[]
            )

    students = list(students.values())
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

