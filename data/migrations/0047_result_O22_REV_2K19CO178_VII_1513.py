
# This migration file was made by the scraper utility.
# Result PDF : O22_REV_2K19CO178_VII_1513

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O22_REV_2K19CO178_VII_1513', 7, {n_heirarchy})")

    query = """insert into result_student_details values
('O22_REV_2K19CO178_VII_1513','2K19/CO/178', 'JAYANT YADAV', 22, 7.09, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O22_REV_2K19CO178_VII_1513', '2K19/CO/178', 'CO411', 'C'),
('O22_REV_2K19CO178_VII_1513', '2K19/CO/178', 'CO401', 'A+'),
('O22_REV_2K19CO178_VII_1513', '2K19/CO/178', 'CO403', 'A'),
('O22_REV_2K19CO178_VII_1513', '2K19/CO/178', 'MS499', 'A+'),
('O22_REV_2K19CO178_VII_1513', '2K19/CO/178', 'CO429', 'B'),
('O22_REV_2K19CO178_VII_1513', '2K19/CO/178', 'IT405', 'A+'),
('O22_REV_2K19CO178_VII_1513', '2K19/CO/178', 'SE313', 'B')
;
"""
    cur.execute(query)

