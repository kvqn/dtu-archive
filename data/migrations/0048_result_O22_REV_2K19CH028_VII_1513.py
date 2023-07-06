
# This migration file was made by the scraper utility.
# Result PDF : O22_REV_2K19CH028_VII_1513

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O22_REV_2K19CH028_VII_1513', 7, {n_heirarchy})")

    query = """insert into result_student_details values
('O22_REV_2K19CH028_VII_1513','2K19/CH/028', 'HIMANSHU CHAUHAN', 26, 8.46, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O22_REV_2K19CH028_VII_1513', '2K19/CH/028', 'CH401', 'A+'),
('O22_REV_2K19CH028_VII_1513', '2K19/CH/028', 'CH403', 'A'),
('O22_REV_2K19CH028_VII_1513', '2K19/CH/028', 'MS499', 'A+'),
('O22_REV_2K19CH028_VII_1513', '2K19/CH/028', 'CH417', 'B'),
('O22_REV_2K19CH028_VII_1513', '2K19/CH/028', 'CH429', 'A'),
('O22_REV_2K19CH028_VII_1513', '2K19/CH/028', 'HU353a', 'O'),
('O22_REV_2K19CH028_VII_1513', '2K19/CH/028', 'HU403', 'A+'),
('O22_REV_2K19CH028_VII_1513', '2K19/CH/028', 'MOOC401*', 'A+'),
('O22_REV_2K19CH028_VII_1513', '2K19/CH/028', 'MOOC403*', 'A+')
;
"""
    cur.execute(query)

