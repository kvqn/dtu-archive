
# This migration file was made by the scraper utility.
# Result PDF : O21_REV_RE_SEM_BTECH_1533

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O21_REV_RE_SEM_BTECH_1533', 5, {n_heirarchy})")

    query = """insert into result_student_details values
('O21_REV_RE_SEM_BTECH_1533','2K19/CE/149', 'NAV RAJ DANGAL', 23, 8.0, '', False),
('O21_REV_RE_SEM_BTECH_1533','2K20/CO/61', 'AMANDEEP KUMAR', 2, NULL, '', True),
('O21_REV_RE_SEM_BTECH_1533','2K18/CO/146', 'HARSHIT SONI', 4, NULL, '', True)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O21_REV_RE_SEM_BTECH_1533', '2K19/CE/149', 'CE301', 'A'),
('O21_REV_RE_SEM_BTECH_1533', '2K19/CE/149', 'CE303', 'A+'),
('O21_REV_RE_SEM_BTECH_1533', '2K19/CE/149', 'MG301', 'A'),
('O21_REV_RE_SEM_BTECH_1533', '2K19/CE/149', 'CE307', 'A'),
('O21_REV_RE_SEM_BTECH_1533', '2K19/CE/149', 'CE319', 'B+'),
('O21_REV_RE_SEM_BTECH_1533', '2K19/CE/149', 'CE327', 'A'),
('O21_REV_RE_SEM_BTECH_1533', '2K20/CO/61', 'FEC3', 'A'),
('O21_REV_RE_SEM_BTECH_1533', '2K18/CO/146', 'AP101', 'B')
;
"""
    cur.execute(query)

