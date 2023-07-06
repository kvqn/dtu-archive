
# This migration file was made by the scraper utility.
# Result PDF : E22_REV_2K21_CO_92_II_1559

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E22_REV_2K21_CO_92_II_1559', 2, {n_heirarchy})")

    query = """insert into result_student_details values
('E22_REV_2K21_CO_92_II_1559','2K21/A3/05', 'ARINDAM RAO', 22, 5.45, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E22_REV_2K21_CO_92_II_1559', '2K21/A3/05', 'MA102', 'B'),
('E22_REV_2K21_CO_92_II_1559', '2K21/A3/05', 'AP102', 'C'),
('E22_REV_2K21_CO_92_II_1559', '2K21/A3/05', 'EE102', 'C'),
('E22_REV_2K21_CO_92_II_1559', '2K21/A3/05', 'CO102', 'P'),
('E22_REV_2K21_CO_92_II_1559', '2K21/A3/05', 'ME102', 'C'),
('E22_REV_2K21_CO_92_II_1559', '2K21/A3/05', 'MS199', 'A'),
('E22_REV_2K21_CO_92_II_1559', '2K21/A3/05', 'FEC24', 'B+')
;
"""
    cur.execute(query)

