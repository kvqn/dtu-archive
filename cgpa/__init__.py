
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
        self.name = " ".join(self.name)
        self.failed_papers = " ".join(self.failed_papers)

from .declutter import declutter
from .extract_text import extract_text
from .parser import parse_input