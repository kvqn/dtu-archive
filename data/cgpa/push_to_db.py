from dotenv import load_dotenv
import mariadb
import os
from . import Student
import traceback
import sys


def push_to_db(result_name : str, students : list[Student], semester: int, heirarchy: str):
    load_dotenv()

    query=""

    try:
        MARIADB_USER = os.getenv("DTUARCHIVE_MARIADB_USER")
        MARIADB_PASS = os.getenv("DTUARCHIVE_MARIADB_PASS")
        MARIADB_HOST = os.getenv("DTUARCHIVE_MARIADB_HOST")
        MARIADB_PORT = os.getenv("DTUARCHIVE_MARIADB_PORT")
        MARIADB_DB = os.getenv("DTUARCHIVE_MARIADB_DB")

        MARIADB_PORT = int(MARIADB_PORT) if MARIADB_PORT is not None else None

        if MARIADB_USER is None or MARIADB_PASS is None or MARIADB_HOST is None or MARIADB_PORT is None:
            print("Error in connecting to database. Check environment variables.")
            return

        conn = mariadb.connect(
            database=MARIADB_DB,
            user=MARIADB_USER,
            password=MARIADB_PASS,
            host=MARIADB_HOST,
            port=MARIADB_PORT,
        )

        if conn is None:
            print("Error in connecting to database.")
            return

        cur = conn.cursor()

        if heirarchy == "latest":
            cur.execute("select max(heirarchy) from result_heirarchy")
            result = cur.fetchall()
            if (result[0][0] is None):
                n_heirarchy = 1
            else:
                n_heirarchy = result[0][0] + 1
        else:
            cur.execute("select min(heirarchy) from result_heirarchy")
            result = cur.fetchall()
            if (result[0][0] is None):
                n_heirarchy = 1
            else:
                n_heirarchy = result[0][0] - 1

        cur.execute(f"insert into result_heirarchy values ('{result_name}', {semester}, {n_heirarchy})")
        print("Inserted into result_heirarchy table.")

        values = []
        for student in students:
            values.append(f"('{result_name}','{student.rollno}', '{student.name}', {student.tc}, {student.cgpa}, '{student.failed_papers}', {student.bad})")
        query = "insert into result_student_details values " + ",".join(values)
        cur.execute(query)

        values = []
        for student in students:
            for subject, grade in student.grades.items():
                values.append(f"('{result_name}', '{student.rollno}', '{subject}', '{grade}')")
        query = "insert into result_grades values " + ",".join(values)
        cur.execute(query)
        # for i_value, value in enumerate(values):
        #     sys.stdout.write(f"\rProcessing grade {i_value+1}/{len(values)}")
        #     query = "insert into result_grades values " + value
        #     cur.execute(query)
        # sys.stdout.write("\n")

        conn.commit()
        print("Successfully pushed to database.")

    except Exception:
        print("Error in connecting to database.")
        # print traceback
        print(traceback.format_exc())
        print("Query,", query)



