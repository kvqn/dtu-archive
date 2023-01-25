
class Student:
    def __init__(self, subjects):
        self.subjects = subjects
        self.grades = []
        self.name = []
        self.failed_papers = []
        self.sno = None
        self.rollno = None
        self.tc = None
        self.cgpa = None

    def __str__(self):
        return f"(Student: {self.sno}, {self.name}, {self.rollno}, {self.grades}, {self.tc}, {self.cgpa}, {self.failed_papers})\n"

    def finalize(self):
        self.sno = int(self.sno) if self.sno is not None else 0
        self.rollno = self.rollno if self.rollno is not None else ""
        self.name = " ".join(self.name)
        self.failed_papers = " ".join(self.failed_papers)
        self.grades = {subject: grade for subject, grade in zip(self.subjects, self.grades)}
        self.cgpa = float(self.cgpa)
        self.tc = int(self.tc)

    def to_dict(self):
        return {
            "sno": self.sno,
            "name": self.name,
            "rollno": self.rollno,
            "grades": self.grades,
            "tc": self.tc,
            "cgpa": self.cgpa,
            "failed_papers": self.failed_papers
        }

    @staticmethod
    def from_dict(data):
        student = Student([])
        student.sno = data["sno"]
        student.name = data["name"]
        student.rollno = data["rollno"]
        student.grades = data["grades"]
        student.tc = data["tc"]
        student.cgpa = data["cgpa"]
        student.failed_papers = data["failed_papers"]
        return student


from .declutter import declutter
from .extract_text import extract_text
from .parser import parse_input
