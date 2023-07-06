
# This migration file was made by the scraper utility.
# Result PDF : O22_REV_2K22_PE_506_III_1559

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O22_REV_2K22_PE_506_III_1559', 3, {n_heirarchy})")

    query = """insert into result_student_details values
('O22_REV_2K22_PE_506_III_1559','2K22/PE/506', 'SATYAM KUMAR', 18, 5.0, 'ME261', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O22_REV_2K22_PE_506_III_1559', '2K22/PE/506', 'ME261', 'F'),
('O22_REV_2K22_PE_506_III_1559', '2K22/PE/506', 'PE201', 'A'),
('O22_REV_2K22_PE_506_III_1559', '2K22/PE/506', 'PE203', 'P'),
('O22_REV_2K22_PE_506_III_1559', '2K22/PE/506', 'PE205', 'B'),
('O22_REV_2K22_PE_506_III_1559', '2K22/PE/506', 'PE207', 'B+'),
('O22_REV_2K22_PE_506_III_1559', '2K22/PE/506', 'FEC7', 'C')
;
"""
    cur.execute(query)

