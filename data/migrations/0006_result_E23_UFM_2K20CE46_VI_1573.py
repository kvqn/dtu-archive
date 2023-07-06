
# This migration file was made by the scraper utility.
# Result PDF : E23_UFM_2K20CE46_VI_1573

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E23_UFM_2K20CE46_VI_1573', 6, {n_heirarchy})")

    query = """insert into result_student_details values
('E23_UFM_2K20CE46_VI_1573','2K20/CE/46', 'BHAVISHYA BIRHMAN', 15, 4.39, 'CE302  CE306,', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E23_UFM_2K20CE46_VI_1573', '2K20/CE/46', 'CE308', 'A'),
('E23_UFM_2K20CE46_VI_1573', '2K20/CE/46', 'CE314', 'A'),
('E23_UFM_2K20CE46_VI_1573', '2K20/CE/46', 'CE302', 'F'),
('E23_UFM_2K20CE46_VI_1573', '2K20/CE/46', 'CE304', 'P'),
('E23_UFM_2K20CE46_VI_1573', '2K20/CE/46', 'CE306', 'F'),
('E23_UFM_2K20CE46_VI_1573', '2K20/CE/46', 'HU302a', 'B+')
;
"""
    cur.execute(query)

