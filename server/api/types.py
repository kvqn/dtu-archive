from typing import TypedDict

class UnprocessedStudent(TypedDict):
    sno : int
    name : str
    rollno : str
    cgpa : float
    grades : dict[str, str]
    tc : int
    cgpa : float
    failed_papers : str


class Student(TypedDict):
    rank : int
    roll : str
    name : str
    grades : list[str]
    cgpa : float


class CompiledResult(TypedDict):
    subject_codes : list[str]
    students : list[Student]

