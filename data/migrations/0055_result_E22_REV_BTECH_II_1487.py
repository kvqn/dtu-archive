
# This migration file was made by the scraper utility.
# Result PDF : E22_REV_BTECH_II_1487

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E22_REV_BTECH_II_1487', 2, {n_heirarchy})")

    query = """insert into result_student_details values
('E22_REV_BTECH_II_1487','2K21/A1/32', 'YASEEN MOHAMMED', 20, 5.27, '', False),
('E22_REV_BTECH_II_1487','2K21/A18/58', 'VANSH MALHOTRA', 20, 4.73, 'MS199,', False),
('E22_REV_BTECH_II_1487','2K21/B2/03', 'AMAN YADAV', 18, 4.82, '', False),
('E22_REV_BTECH_II_1487','2K21/B2/28', 'HITANSHU KHANDELWAL', 18, 5.67, '', True),
('E22_REV_BTECH_II_1487','2K21/B7/23', 'BHAVAY AGGARWAL', 22, 8.45, '', False),
('E22_REV_BTECH_II_1487','2K21/B14/15', 'DHRUV KUMAR SINGH', 18, 6.44, '', True)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E22_REV_BTECH_II_1487', '2K21/A1/32', 'MA102', 'B+'),
('E22_REV_BTECH_II_1487', '2K21/A1/32', 'AP102', 'C'),
('E22_REV_BTECH_II_1487', '2K21/A1/32', 'EE102', 'P'),
('E22_REV_BTECH_II_1487', '2K21/A1/32', 'CO102', 'C'),
('E22_REV_BTECH_II_1487', '2K21/A1/32', 'ME102', 'B+'),
('E22_REV_BTECH_II_1487', '2K21/A1/32', 'MS199', 'A+'),
('E22_REV_BTECH_II_1487', '2K21/A1/32', 'FEC1', 'F'),
('E22_REV_BTECH_II_1487', '2K21/A18/58', 'MA102', 'P'),
('E22_REV_BTECH_II_1487', '2K21/A18/58', 'AP102', 'P'),
('E22_REV_BTECH_II_1487', '2K21/A18/58', 'EE102', 'C'),
('E22_REV_BTECH_II_1487', '2K21/A18/58', 'CO102', 'B'),
('E22_REV_BTECH_II_1487', '2K21/A18/58', 'ME102', 'B+'),
('E22_REV_BTECH_II_1487', '2K21/A18/58', 'MS199', 'F'),
('E22_REV_BTECH_II_1487', '2K21/A18/58', 'FEC7', 'B+'),
('E22_REV_BTECH_II_1487', '2K21/B2/03', 'MA102', 'F'),
('E22_REV_BTECH_II_1487', '2K21/B2/03', 'AP102', 'C'),
('E22_REV_BTECH_II_1487', '2K21/B2/03', 'AC102', 'C'),
('E22_REV_BTECH_II_1487', '2K21/B2/03', 'ME104', 'P'),
('E22_REV_BTECH_II_1487', '2K21/B2/03', 'ME106', 'B+'),
('E22_REV_BTECH_II_1487', '2K21/B2/03', 'MS199', 'A+'),
('E22_REV_BTECH_II_1487', '2K21/B2/03', 'FEC47', 'A+'),
('E22_REV_BTECH_II_1487', '2K21/B2/28', 'MA102', 'P'),
('E22_REV_BTECH_II_1487', '2K21/B2/28', 'AP102', 'C'),
('E22_REV_BTECH_II_1487', '2K21/B2/28', 'AC102', 'B'),
('E22_REV_BTECH_II_1487', '2K21/B2/28', 'ME104', 'B+'),
('E22_REV_BTECH_II_1487', '2K21/B2/28', 'ME106', 'O'),
('E22_REV_BTECH_II_1487', '2K21/B2/28', 'MS199', 'P'),
('E22_REV_BTECH_II_1487', '2K21/B7/23', 'MA102', 'A+'),
('E22_REV_BTECH_II_1487', '2K21/B7/23', 'AP102', 'A+'),
('E22_REV_BTECH_II_1487', '2K21/B7/23', 'AC102', 'B+'),
('E22_REV_BTECH_II_1487', '2K21/B7/23', 'ME104', 'A'),
('E22_REV_BTECH_II_1487', '2K21/B7/23', 'ME106', 'A+'),
('E22_REV_BTECH_II_1487', '2K21/B7/23', 'MS199', 'O'),
('E22_REV_BTECH_II_1487', '2K21/B7/23', 'FEC7', 'A'),
('E22_REV_BTECH_II_1487', '2K21/B14/15', 'MA102', 'C'),
('E22_REV_BTECH_II_1487', '2K21/B14/15', 'AP102', 'B'),
('E22_REV_BTECH_II_1487', '2K21/B14/15', 'AC102', 'C'),
('E22_REV_BTECH_II_1487', '2K21/B14/15', 'ME104', 'A+'),
('E22_REV_BTECH_II_1487', '2K21/B14/15', 'ME106', 'A+'),
('E22_REV_BTECH_II_1487', '2K21/B14/15', 'MS199', 'A')
;
"""
    cur.execute(query)

