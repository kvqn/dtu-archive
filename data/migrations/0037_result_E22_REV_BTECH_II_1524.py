
# This migration file was made by the scraper utility.
# Result PDF : E22_REV_BTECH_II_1524

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E22_REV_BTECH_II_1524', 2, {n_heirarchy})")

    query = """insert into result_student_details values
('E22_REV_BTECH_II_1524','2K21/B17/21', 'HARSHIT', 22, 7.09, '', False),
('E22_REV_BTECH_II_1524','2K21/B17/24', 'JAMAL MOHAMMED ESA', 20, 7.55, 'FEC2,', False),
('E22_REV_BTECH_II_1524','2K21/B17/39', 'PRAYAS RATHORE', 18, 5.18, 'MA102', False),
('E22_REV_BTECH_II_1524','2K21/B17/43', 'RAJAT KHAPRA', 22, 7.55, '', False),
('E22_REV_BTECH_II_1524','2K21/B17/68', 'VUGRAPALLI SHIV SAGAR', 18, 5.18, 'MA102', False),
('E22_REV_BTECH_II_1524','2K21/B17/75', 'ISHAN ROJRA', 18, 6.27, 'MA102', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E22_REV_BTECH_II_1524', '2K21/B17/21', 'MA102', 'A'),
('E22_REV_BTECH_II_1524', '2K21/B17/21', 'AP102', 'C'),
('E22_REV_BTECH_II_1524', '2K21/B17/21', 'AC102', 'B+'),
('E22_REV_BTECH_II_1524', '2K21/B17/21', 'ME104', 'B+'),
('E22_REV_BTECH_II_1524', '2K21/B17/21', 'ME106', 'A+'),
('E22_REV_BTECH_II_1524', '2K21/B17/21', 'MS199', 'O'),
('E22_REV_BTECH_II_1524', '2K21/B17/21', 'FEC7', 'C'),
('E22_REV_BTECH_II_1524', '2K21/B17/24', 'MA102', 'A'),
('E22_REV_BTECH_II_1524', '2K21/B17/24', 'AP102', 'B+'),
('E22_REV_BTECH_II_1524', '2K21/B17/24', 'AC102', 'A'),
('E22_REV_BTECH_II_1524', '2K21/B17/24', 'ME104', 'A+'),
('E22_REV_BTECH_II_1524', '2K21/B17/24', 'ME106', 'O'),
('E22_REV_BTECH_II_1524', '2K21/B17/24', 'MS199', 'A+'),
('E22_REV_BTECH_II_1524', '2K21/B17/24', 'FEC2', 'F'),
('E22_REV_BTECH_II_1524', '2K21/B17/39', 'MA102', 'F'),
('E22_REV_BTECH_II_1524', '2K21/B17/39', 'AP102', 'C'),
('E22_REV_BTECH_II_1524', '2K21/B17/39', 'AC102', 'B'),
('E22_REV_BTECH_II_1524', '2K21/B17/39', 'ME104', 'B'),
('E22_REV_BTECH_II_1524', '2K21/B17/39', 'ME106', 'A'),
('E22_REV_BTECH_II_1524', '2K21/B17/39', 'MS199', 'A+'),
('E22_REV_BTECH_II_1524', '2K21/B17/39', 'FEC47', 'B'),
('E22_REV_BTECH_II_1524', '2K21/B17/43', 'MA102', 'B'),
('E22_REV_BTECH_II_1524', '2K21/B17/43', 'AP102', 'B'),
('E22_REV_BTECH_II_1524', '2K21/B17/43', 'AC102', 'B+'),
('E22_REV_BTECH_II_1524', '2K21/B17/43', 'ME104', 'A+'),
('E22_REV_BTECH_II_1524', '2K21/B17/43', 'ME106', 'O'),
('E22_REV_BTECH_II_1524', '2K21/B17/43', 'MS199', 'A'),
('E22_REV_BTECH_II_1524', '2K21/B17/43', 'FEC7', 'A+'),
('E22_REV_BTECH_II_1524', '2K21/B17/68', 'MA102', 'F'),
('E22_REV_BTECH_II_1524', '2K21/B17/68', 'AP102', 'C'),
('E22_REV_BTECH_II_1524', '2K21/B17/68', 'AC102', 'B'),
('E22_REV_BTECH_II_1524', '2K21/B17/68', 'ME104', 'B'),
('E22_REV_BTECH_II_1524', '2K21/B17/68', 'ME106', 'B+'),
('E22_REV_BTECH_II_1524', '2K21/B17/68', 'MS199', 'O'),
('E22_REV_BTECH_II_1524', '2K21/B17/68', 'FEC46', 'B'),
('E22_REV_BTECH_II_1524', '2K21/B17/75', 'MA102', 'F'),
('E22_REV_BTECH_II_1524', '2K21/B17/75', 'AP102', 'B'),
('E22_REV_BTECH_II_1524', '2K21/B17/75', 'AC102', 'B+'),
('E22_REV_BTECH_II_1524', '2K21/B17/75', 'ME104', 'A'),
('E22_REV_BTECH_II_1524', '2K21/B17/75', 'ME106', 'A+'),
('E22_REV_BTECH_II_1524', '2K21/B17/75', 'MS199', 'O'),
('E22_REV_BTECH_II_1524', '2K21/B17/75', 'FEC7', 'A')
;
"""
    cur.execute(query)

