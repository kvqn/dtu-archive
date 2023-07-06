
# This migration file was made by the scraper utility.
# Result PDF : O22_REV_BTECH_1447

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O22_REV_BTECH_1447', 3, {n_heirarchy})")

    query = """insert into result_student_details values
('O22_REV_BTECH_1447','2K20/EP/66', 'KSHITIJ AGARWAL', 18, 5.73, 'EP205,', False),
('O22_REV_BTECH_1447','2K21/AE/75', 'YASH SHARMA', 22, 9.09, '', False),
('O22_REV_BTECH_1447','2K21/AE/27', 'KAMLESH PATEL', 22, 6.82, '', False),
('O22_REV_BTECH_1447','2K21/BT/14', 'KANISHKA SAPRA', 22, 7.18, '', False),
('O22_REV_BTECH_1447','2K21/CE/74', 'KUNAL', 6, 1.82, 'EC251CE203  CE205, CE207,', False),
('O22_REV_BTECH_1447','2K21/EE/118', 'GOPAL SHARMA', 22, 5.73, '', False),
('O22_REV_BTECH_1447','2K20/EE/299', 'VARUN MEHRA', 27, 6.11, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O22_REV_BTECH_1447', '2K20/EP/66', 'ME251', 'B+'),
('O22_REV_BTECH_1447', '2K20/EP/66', 'EP201', 'B'),
('O22_REV_BTECH_1447', '2K20/EP/66', 'EP203', 'B'),
('O22_REV_BTECH_1447', '2K20/EP/66', 'EP205', 'F'),
('O22_REV_BTECH_1447', '2K20/EP/66', 'EP207', 'A'),
('O22_REV_BTECH_1447', '2K20/EP/66', 'FEC32', 'A+'),
('O22_REV_BTECH_1447', '2K21/AE/75', 'PE261', 'O'),
('O22_REV_BTECH_1447', '2K21/AE/75', 'AE201', 'A+'),
('O22_REV_BTECH_1447', '2K21/AE/75', 'AE203', 'A+'),
('O22_REV_BTECH_1447', '2K21/AE/75', 'AE205', 'A+'),
('O22_REV_BTECH_1447', '2K21/AE/75', 'AE207', 'A+'),
('O22_REV_BTECH_1447', '2K21/AE/75', 'FEC46', 'A'),
('O22_REV_BTECH_1447', '2K21/AE/27', 'PE261', 'A'),
('O22_REV_BTECH_1447', '2K21/AE/27', 'AE201', 'B+'),
('O22_REV_BTECH_1447', '2K21/AE/27', 'AE203', 'B+'),
('O22_REV_BTECH_1447', '2K21/AE/27', 'AE205', 'B+'),
('O22_REV_BTECH_1447', '2K21/AE/27', 'AE207', 'C'),
('O22_REV_BTECH_1447', '2K21/AE/27', 'FEC51', 'B+'),
('O22_REV_BTECH_1447', '2K21/BT/14', 'MC251', 'B'),
('O22_REV_BTECH_1447', '2K21/BT/14', 'BT201', 'A+'),
('O22_REV_BTECH_1447', '2K21/BT/14', 'BT203', 'B+'),
('O22_REV_BTECH_1447', '2K21/BT/14', 'BT205', 'B'),
('O22_REV_BTECH_1447', '2K21/BT/14', 'BT207', 'B+'),
('O22_REV_BTECH_1447', '2K21/BT/14', 'FEC7', 'A+'),
('O22_REV_BTECH_1447', '2K21/CE/74', 'EC251', 'F'),
('O22_REV_BTECH_1447', '2K21/CE/74', 'CE201', 'C'),
('O22_REV_BTECH_1447', '2K21/CE/74', 'CE203', 'F'),
('O22_REV_BTECH_1447', '2K21/CE/74', 'CE205', 'F'),
('O22_REV_BTECH_1447', '2K21/CE/74', 'CE207', 'F'),
('O22_REV_BTECH_1447', '2K21/CE/74', 'FEC2', 'O'),
('O22_REV_BTECH_1447', '2K21/EE/118', 'MA261', 'B'),
('O22_REV_BTECH_1447', '2K21/EE/118', 'EE201', 'P'),
('O22_REV_BTECH_1447', '2K21/EE/118', 'EE203', 'C'),
('O22_REV_BTECH_1447', '2K21/EE/118', 'EE205', 'C'),
('O22_REV_BTECH_1447', '2K21/EE/118', 'EE207a', 'B+'),
('O22_REV_BTECH_1447', '2K21/EE/118', 'FEC11', 'A+'),
('O22_REV_BTECH_1447', '2K20/EE/299', 'EE301', 'P'),
('O22_REV_BTECH_1447', '2K20/EE/299', 'EE303', 'P'),
('O22_REV_BTECH_1447', '2K20/EE/299', 'CO427', 'A'),
('O22_REV_BTECH_1447', '2K20/EE/299', 'EE327', 'C'),
('O22_REV_BTECH_1447', '2K20/EE/299', 'EN317', 'B'),
('O22_REV_BTECH_1447', '2K20/EE/299', 'MOOC301*', 'A+'),
('O22_REV_BTECH_1447', '2K20/EE/299', 'MOOC303*', 'A+'),
('O22_REV_BTECH_1447', '2K20/EE/299', 'HU301a', 'B+'),
('O22_REV_BTECH_1447', '2K20/EE/299', 'MS399', 'A+')
;
"""
    cur.execute(query)

