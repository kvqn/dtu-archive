from dotenv import load_dotenv
import os
from . import Student

load_dotenv()

MIGRATIONS_FOLDER = os.getenv("DTUARCHIVE_MIGRATIONS_FOLDER")
if MIGRATIONS_FOLDER is None:
    print("Missing environment variable : DTUARCHIVE_MIGRATIONS_FOLDER")
    exit(1)

def make_migration(result_name : str, students : list[Student], semester: int, heirarchy: str):

    result_student_details_values = []
    for student in students:
        result_student_details_values.append(f"('{result_name}','{student.rollno}', '{student.name}', {student.tc}, {student.cgpa}, '{student.failed_papers}', {student.bad})")
    result_student_details_values = ',\n'.join(result_student_details_values)

    result_grades_values = []
    for student in students:
        for subject, grade in student.grades.items():
            result_grades_values.append(f"('{result_name}', '{student.rollno}', '{subject}', '{grade}')")
    result_grades_values = ',\n'.join(result_grades_values)

    migration = f"""
# This migration file was made by the scraper utility.
# Result PDF : {result_name}

def migration(cur):

    cur.execute("select max(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] {'+ 1' if heirarchy == "latest" else '- 1'}

    cur.execute(f"insert into result_heirarchy values ('{result_name}', {semester}, {{n_heirarchy}})")

    query = \"""insert into result_student_details values
{result_student_details_values}
;
\"""
    cur.execute(query)

    query = \"""insert into result_grades values
{result_grades_values}
;
\"""
    cur.execute(query)

"""

    # determine the filename
    n=0
    for root, dirs, files in os.walk(MIGRATIONS_FOLDER):
        for file in files:
            if file.endswith(".py"):
                n+=1

    # n to 4 digit string
    n = str(n + 1).zfill(4)

    migration_file_path = os.path.join(MIGRATIONS_FOLDER, f"{n}_result_{result_name}.py")

    with open(migration_file_path, "w") as f:
        f.write(migration)


