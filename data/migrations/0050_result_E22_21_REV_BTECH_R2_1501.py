
# This migration file was made by the scraper utility.
# Result PDF : E22_21_REV_BTECH_R2_1501

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E22_21_REV_BTECH_R2_1501', 2, {n_heirarchy})")

    query = """insert into result_student_details values
('E22_21_REV_BTECH_R2_1501','2K19/EP/010', 'AMAN', 2, NULL, '', True),
('E22_21_REV_BTECH_R2_1501','2K19/CO/352', 'SHASHANK', 4, NULL, '', True),
('E22_21_REV_BTECH_R2_1501','2K19/EC/008', 'ADITYA KARTIK GUPTA', 2, NULL, '', True),
('E22_21_REV_BTECH_R2_1501','2K20/CO/459', 'TANVI SINGH', 2, NULL, '', True),
('E22_21_REV_BTECH_R2_1501','2K21/B3/24', 'HIMANSHU SILOLIYA', 20, 7.5, '', False),
('E22_21_REV_BTECH_R2_1501','2K21/B6/77', 'ADITYA GUPTA', 22, 6.0, '', False),
('E22_21_REV_BTECH_R2_1501','2K21/B8/46', 'NAMAN GOYAL', 8, 2.4, 'MA102AP102  ME104,', False),
('E22_21_REV_BTECH_R2_1501','2K21/B14/76', 'HARSH KUMAR', 22, 6.18, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E22_21_REV_BTECH_R2_1501', '2K19/EP/010', 'FEC12', 'B'),
('E22_21_REV_BTECH_R2_1501', '2K19/CO/352', 'CO102', 'B+'),
('E22_21_REV_BTECH_R2_1501', '2K19/EC/008', 'FEC39', 'C'),
('E22_21_REV_BTECH_R2_1501', '2K19/EC/008', 'FEC52', 'A+'),
('E22_21_REV_BTECH_R2_1501', '2K20/CO/459', 'FEC54', 'A+'),
('E22_21_REV_BTECH_R2_1501', '2K21/B3/24', 'MA102', 'B+'),
('E22_21_REV_BTECH_R2_1501', '2K21/B3/24', 'AP102', 'B+'),
('E22_21_REV_BTECH_R2_1501', '2K21/B3/24', 'AC102', 'A'),
('E22_21_REV_BTECH_R2_1501', '2K21/B3/24', 'ME104', 'B+'),
('E22_21_REV_BTECH_R2_1501', '2K21/B3/24', 'ME106', 'A'),
('E22_21_REV_BTECH_R2_1501', '2K21/B3/24', 'FEC10', 'A+'),
('E22_21_REV_BTECH_R2_1501', '2K21/B6/77', 'MA102', 'C'),
('E22_21_REV_BTECH_R2_1501', '2K21/B6/77', 'AP102', 'P'),
('E22_21_REV_BTECH_R2_1501', '2K21/B6/77', 'AC102', 'C'),
('E22_21_REV_BTECH_R2_1501', '2K21/B6/77', 'ME104', 'B+'),
('E22_21_REV_BTECH_R2_1501', '2K21/B6/77', 'ME106', 'A'),
('E22_21_REV_BTECH_R2_1501', '2K21/B6/77', 'MS199', 'O'),
('E22_21_REV_BTECH_R2_1501', '2K21/B6/77', 'FEC7', 'B'),
('E22_21_REV_BTECH_R2_1501', '2K21/B8/46', 'MA102', 'F'),
('E22_21_REV_BTECH_R2_1501', '2K21/B8/46', 'AP102', 'F'),
('E22_21_REV_BTECH_R2_1501', '2K21/B8/46', 'AC102', 'P'),
('E22_21_REV_BTECH_R2_1501', '2K21/B8/46', 'ME104', 'F'),
('E22_21_REV_BTECH_R2_1501', '2K21/B8/46', 'ME106', 'B+'),
('E22_21_REV_BTECH_R2_1501', '2K21/B8/46', 'MS199', 'A+'),
('E22_21_REV_BTECH_R2_1501', '2K21/B14/76', 'MA102', 'B'),
('E22_21_REV_BTECH_R2_1501', '2K21/B14/76', 'AP102', 'C'),
('E22_21_REV_BTECH_R2_1501', '2K21/B14/76', 'AC102', 'B'),
('E22_21_REV_BTECH_R2_1501', '2K21/B14/76', 'ME104', 'B+'),
('E22_21_REV_BTECH_R2_1501', '2K21/B14/76', 'ME106', 'A'),
('E22_21_REV_BTECH_R2_1501', '2K21/B14/76', 'MS199', 'C'),
('E22_21_REV_BTECH_R2_1501', '2K21/B14/76', 'FEC7', 'B+')
;
"""
    cur.execute(query)

