from typing import TypedDict
import json
import os
from .create_sem_result import FinalResult

class Student(TypedDict):
    rollno: str
    name: str
    cgpas: list[float]
    aggregate: float

class AggregateResult(TypedDict):
    n_students: int
    n_semesters: int
    students: list[Student]


def create_aggregate_result(args):
    """
    Creates aggregate result from the semester results.
    """

    OUTPUT_FILE = "aggregate-result.json"

    folders = os.listdir()
    folders = [folder for folder in folders if os.path.isdir(folder) and folder.startswith("sem-")]
    folders.sort()

    print("Detected folders:", ' '.join(folders))

    students : dict[str, Student] = {} # roll_no -> Student
    for n_folder, folder in enumerate(folders):
        try:
            with open(os.path.join(folder, "result.json")) as f:
                result : FinalResult = json.load(f)
        except FileNotFoundError:
            print(f"Error: {folder} does not contain result.json")
            return

        for student in result["students"]:
            rollno = student["rollno"]
            if rollno not in students:
                students[rollno] = Student(
                    rollno = rollno,
                    name = student["name"],
                    cgpas = [0.0] * len(folders),
                    aggregate=0.0
                )

            students[rollno]["cgpas"][n_folder] = student["cgpa"]

    for student in students.values():
        student["aggregate"] = sum(student["cgpas"]) / len(folders)

    list_students = list(students.values())
    list_students.sort(key=lambda student: student["aggregate"], reverse=True)

    aggregate_result = AggregateResult(
        n_students = len(list_students),
        n_semesters = len(folders),
        students = list_students
    )

    with open(OUTPUT_FILE, "w") as f:
        json.dump(aggregate_result, f, indent=2)

    print("Done!")


