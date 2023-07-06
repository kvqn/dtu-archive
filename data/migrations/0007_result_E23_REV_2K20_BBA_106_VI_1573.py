
# This migration file was made by the scraper utility.
# Result PDF : E23_REV_2K20_BBA_106_VI_1573

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E23_REV_2K20_BBA_106_VI_1573', 6, {n_heirarchy})")

    query = """insert into result_student_details values
('E23_REV_2K20_BBA_106_VI_1573','2K20/BBA/106', 'NAVAM LAMBA', 22, 8.55, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E23_REV_2K20_BBA_106_VI_1573', '2K20/BBA/106', 'BBA311', 'B+'),
('E23_REV_2K20_BBA_106_VI_1573', '2K20/BBA/106', 'BBA312', 'A+'),
('E23_REV_2K20_BBA_106_VI_1573', '2K20/BBA/106', 'BBA313', 'A'),
('E23_REV_2K20_BBA_106_VI_1573', '2K20/BBA/106', 'BBA3068', 'A+'),
('E23_REV_2K20_BBA_106_VI_1573', '2K20/BBA/106', 'BBA3153', 'O')
;
"""
    cur.execute(query)

