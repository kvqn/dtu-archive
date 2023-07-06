
# This migration file was made by the scraper utility.
# Result PDF : E22_REV_2K19_EP_060_VI_1559

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E22_REV_2K19_EP_060_VI_1559', 6, {n_heirarchy})")

    query = """insert into result_student_details values
('E22_REV_2K19_EP_060_VI_1559','2K19/EP/060', 'NIMISHA KUKRETY', 27, 7.11, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E22_REV_2K19_EP_060_VI_1559', '2K19/EP/060', 'EP302', 'B+'),
('E22_REV_2K19_EP_060_VI_1559', '2K19/EP/060', 'EP304', 'A'),
('E22_REV_2K19_EP_060_VI_1559', '2K19/EP/060', 'EP306', 'B'),
('E22_REV_2K19_EP_060_VI_1559', '2K19/EP/060', 'EC412', 'C'),
('E22_REV_2K19_EP_060_VI_1559', '2K19/EP/060', 'EN314', 'B+'),
('E22_REV_2K19_EP_060_VI_1559', '2K19/EP/060', 'MOOC302', 'A+'),
('E22_REV_2K19_EP_060_VI_1559', '2K19/EP/060', 'MOOC304', 'A+'),
('E22_REV_2K19_EP_060_VI_1559', '2K19/EP/060', 'HU302a', 'A')
;
"""
    cur.execute(query)

