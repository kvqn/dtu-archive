
# This migration file was made by the scraper utility.
# Result PDF : E22_REV_BTECH_II_1566

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E22_REV_BTECH_II_1566', 2, {n_heirarchy})")

    query = """insert into result_student_details values
('E22_REV_BTECH_II_1566','2K21/A4/32', 'HIMANSHU TANWAR', 16, 4.09, 'CO102, FEC45,', False),
('E22_REV_BTECH_II_1566','2K21/A8/38', 'YOGESH PARIHAR', 18, 5.36, 'CO102,', False),
('E22_REV_BTECH_II_1566','2K21/A8/68', 'ANSHUL NAIN', 12, 3.0, 'MA102 CO102, FEC3,', False),
('E22_REV_BTECH_II_1566','2K21/A10/24', 'ROUNIT RAKESH', 8, 2.18, 'MA102EE102  CO102, ME102,', False),
('E22_REV_BTECH_II_1566','2K21/A10/63', 'VARUN THOMAS', 18, 4.64, 'CO102,', False),
('E22_REV_BTECH_II_1566','2K21/B13/27', 'AMAN RANA', 6, 1.09, 'MA102AP102  ME104, ME106, MS199,', False),
('E22_REV_BTECH_II_1566','2K21/B18/60', 'SHOBHIT ARYA', 10, 2.73, 'MA102AP102  ME104,', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E22_REV_BTECH_II_1566', '2K21/A4/32', 'MA102', 'C'),
('E22_REV_BTECH_II_1566', '2K21/A4/32', 'AP102', 'C'),
('E22_REV_BTECH_II_1566', '2K21/A4/32', 'EE102', 'P'),
('E22_REV_BTECH_II_1566', '2K21/A4/32', 'CO102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A4/32', 'ME102', 'B+'),
('E22_REV_BTECH_II_1566', '2K21/A4/32', 'MS199', 'O'),
('E22_REV_BTECH_II_1566', '2K21/A4/32', 'FEC45', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A8/38', 'MA102', 'C'),
('E22_REV_BTECH_II_1566', '2K21/A8/38', 'AP102', 'B'),
('E22_REV_BTECH_II_1566', '2K21/A8/38', 'EE102', 'B'),
('E22_REV_BTECH_II_1566', '2K21/A8/38', 'CO102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A8/38', 'ME102', 'A+'),
('E22_REV_BTECH_II_1566', '2K21/A8/38', 'MS199', 'A+'),
('E22_REV_BTECH_II_1566', '2K21/A8/38', 'FEC27', 'B+'),
('E22_REV_BTECH_II_1566', '2K21/A8/68', 'MA102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A8/68', 'AP102', 'P'),
('E22_REV_BTECH_II_1566', '2K21/A8/68', 'EE102', 'C'),
('E22_REV_BTECH_II_1566', '2K21/A8/68', 'CO102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A8/68', 'ME102', 'B'),
('E22_REV_BTECH_II_1566', '2K21/A8/68', 'MS199', 'A+'),
('E22_REV_BTECH_II_1566', '2K21/A8/68', 'FEC3', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A10/24', 'MA102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A10/24', 'AP102', 'C'),
('E22_REV_BTECH_II_1566', '2K21/A10/24', 'EE102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A10/24', 'CO102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A10/24', 'ME102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A10/24', 'MS199', 'A+'),
('E22_REV_BTECH_II_1566', '2K21/A10/24', 'FEC7', 'C'),
('E22_REV_BTECH_II_1566', '2K21/A10/63', 'MA102', 'P'),
('E22_REV_BTECH_II_1566', '2K21/A10/63', 'AP102', 'B'),
('E22_REV_BTECH_II_1566', '2K21/A10/63', 'EE102', 'B'),
('E22_REV_BTECH_II_1566', '2K21/A10/63', 'CO102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/A10/63', 'ME102', 'C'),
('E22_REV_BTECH_II_1566', '2K21/A10/63', 'MS199', 'A+'),
('E22_REV_BTECH_II_1566', '2K21/A10/63', 'FEC7', 'C'),
('E22_REV_BTECH_II_1566', '2K21/B13/27', 'MA102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/B13/27', 'AP102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/B13/27', 'AC102', 'P'),
('E22_REV_BTECH_II_1566', '2K21/B13/27', 'ME104', 'F'),
('E22_REV_BTECH_II_1566', '2K21/B13/27', 'ME106', 'F'),
('E22_REV_BTECH_II_1566', '2K21/B13/27', 'MS199', 'F'),
('E22_REV_BTECH_II_1566', '2K21/B13/27', 'FEC24', 'P'),
('E22_REV_BTECH_II_1566', '2K21/B18/60', 'MA102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/B18/60', 'AP102', 'F'),
('E22_REV_BTECH_II_1566', '2K21/B18/60', 'AC102', 'P'),
('E22_REV_BTECH_II_1566', '2K21/B18/60', 'ME104', 'F'),
('E22_REV_BTECH_II_1566', '2K21/B18/60', 'ME106', 'B+'),
('E22_REV_BTECH_II_1566', '2K21/B18/60', 'MS199', 'A+'),
('E22_REV_BTECH_II_1566', '2K21/B18/60', 'FEC9', 'B')
;
"""
    cur.execute(query)

