
# This migration file was made by the scraper utility.
# Result PDF : E23_UFM_2K20SE84_VI_1573

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E23_UFM_2K20SE84_VI_1573', 6, {n_heirarchy})")

    query = """insert into result_student_details values
('E23_UFM_2K20SE84_VI_1573','2K20/SE/84', 'NABIYU SAMUEL', 23, 6.61, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E23_UFM_2K20SE84_VI_1573', '2K20/SE/84', 'SE308', 'B+'),
('E23_UFM_2K20SE84_VI_1573', '2K20/SE/84', 'SE316', 'B+'),
('E23_UFM_2K20SE84_VI_1573', '2K20/SE/84', 'SE302a', 'B'),
('E23_UFM_2K20SE84_VI_1573', '2K20/SE/84', 'SE304a', 'B'),
('E23_UFM_2K20SE84_VI_1573', '2K20/SE/84', 'SE306', 'B'),
('E23_UFM_2K20SE84_VI_1573', '2K20/SE/84', 'MG302', 'A')
;
"""
    cur.execute(query)

