
# This migration file was made by the scraper utility.
# Result PDF : O21_E22_REV_RE_BTECH_R1_1502

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O21_E22_REV_RE_BTECH_R1_1502', 2, {n_heirarchy})")

    query = """insert into result_student_details values
('O21_E22_REV_RE_BTECH_R1_1502','2K18/EN/005', 'ADARSH RANJAN JHA', 16, NULL, '', True),
('O21_E22_REV_RE_BTECH_R1_1502','2K20/IT/90', 'NIMISH ADVANI', 2, NULL, '', True),
('O21_E22_REV_RE_BTECH_R1_1502','2K19/EC/174', 'SARTHAK TAYAL', 22, NULL, '', True),
('O21_E22_REV_RE_BTECH_R1_1502','2K21/A8/32', 'YASH DHAWAN', 14, 3.27, 'MA102EE102 ', False),
('O21_E22_REV_RE_BTECH_R1_1502','2K21/A17/14', 'KESHAV CHANDRA', 22, 6.82, '', False),
('O21_E22_REV_RE_BTECH_R1_1502','2K21/B4/13', 'ADITYA KUMAR', 22, 8.82, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O21_E22_REV_RE_BTECH_R1_1502', '2K18/EN/005', 'EN201', 'C'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K18/EN/005', 'EN203', 'P'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K18/EN/005', 'EN205', 'B+'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K18/EN/005', 'EN207', 'P'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K18/EN/005', 'EN301', 'F'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K18/EN/005', 'EN303', 'C'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K20/IT/90', 'FEC2', 'A'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K19/EC/174', 'FEC25', 'B'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K19/EC/174', 'EE262', 'B'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K19/EC/174', 'EC202', 'B'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K19/EC/174', 'EC204', 'P'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K19/EC/174', 'EC206', 'B'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K19/EC/174', 'EC208', 'C'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A8/32', 'MA102', 'F'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A8/32', 'AP102', 'P'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A8/32', 'EE102', 'F'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A8/32', 'CO102', 'P'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A8/32', 'ME102', 'P'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A8/32', 'MS199', 'A'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A8/32', 'FEC3', 'A'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A17/14', 'MA102', 'B'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A17/14', 'AP102', 'B+'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A17/14', 'EE102', 'B'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A17/14', 'CO102', 'B+'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A17/14', 'ME102', 'A'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A17/14', 'MS199', 'A'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/A17/14', 'FEC1', 'B+'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/B4/13', 'MA102', 'A'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/B4/13', 'AP102', 'A+'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/B4/13', 'AC102', 'A+'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/B4/13', 'ME104', 'A+'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/B4/13', 'ME106', 'A+'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/B4/13', 'MS199', 'A+'),
('O21_E22_REV_RE_BTECH_R1_1502', '2K21/B4/13', 'FEC2', 'A+')
;
"""
    cur.execute(query)

