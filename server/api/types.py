from typing import TypedDict


class Student(TypedDict):
    rank : int
    roll : str
    name : str
    grades : list[str]
    cgpa : float


class CompiledResult(TypedDict):
    subject_codes : list[str]
    students : list[Student]

