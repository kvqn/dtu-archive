
# This migration file was made by the scraper utility.
# Result PDF : O21_REV_RE_SEM_I_1457

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O21_REV_RE_SEM_I_1457', 1, {n_heirarchy})")

    query = """insert into result_student_details values
('O21_REV_RE_SEM_I_1457','2K18/EE/157', 'RAMNATH', 12, NULL, '', True),
('O21_REV_RE_SEM_I_1457','2K21/B3/18', 'DESAM CHANDRA KIRAN', 20, 7.4, '', False),
('O21_REV_RE_SEM_I_1457','2K21/B3/59', 'SHRESTH AGGARWAL', 20, 8.4, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O21_REV_RE_SEM_I_1457', '2K18/EE/157', 'ME105', 'B'),
('O21_REV_RE_SEM_I_1457', '2K18/EE/157', 'MA101', 'B'),
('O21_REV_RE_SEM_I_1457', '2K18/EE/157', 'AP101', 'A'),
('O21_REV_RE_SEM_I_1457', '2K18/EE/157', 'FEC10', 'A'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/18', 'MA101', 'B+'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/18', 'AP101', 'A'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/18', 'EE101', 'A'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/18', 'CO101', 'B+'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/18', 'ME105', 'B'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/18', 'FEC3', 'A'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/59', 'MA101', 'A'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/59', 'AP101', 'A+'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/59', 'EE101', 'A+'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/59', 'CO101', 'A+'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/59', 'ME105', 'B'),
('O21_REV_RE_SEM_I_1457', '2K21/B3/59', 'FEC12', 'A')
;
"""
    cur.execute(query)

