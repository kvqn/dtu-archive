
# This migration file was made by the scraper utility.
# Result PDF : O22_BTECH_III_REV_R1_1526

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O22_BTECH_III_REV_R1_1526', 3, {n_heirarchy})")

    query = """insert into result_student_details values
('O22_BTECH_III_REV_R1_1526','2K21/CE/09', 'ADARSH KUMAR', 22, 6.36, '', False),
('O22_BTECH_III_REV_R1_1526','2K21/CE/39', 'BHAVESH KUMAR', 22, 6.73, '', False),
('O22_BTECH_III_REV_R1_1526','2K21/CE/01', 'AAKASH KUMAR YADAV', 18, 4.09, 'CE207,', False),
('O22_BTECH_III_REV_R1_1526','2K21/CE/158', 'ARHANT TEWARI', 22, 8.18, '', False),
('O22_BTECH_III_REV_R1_1526','2K21/EE/263', 'SHASHANK SHAHI', 22, 7.64, '', False),
('O22_BTECH_III_REV_R1_1526','2K21/EE/88', 'BHARTESH MEENA', 22, 7.73, '', False),
('O22_BTECH_III_REV_R1_1526','2K21/EE/87', 'AYUSH KARIR', 22, 5.09, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O22_BTECH_III_REV_R1_1526', '2K21/CE/09', 'EC251', 'B'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/09', 'CE201', 'A'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/09', 'CE203', 'B'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/09', 'CE205', 'C'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/09', 'CE207', 'B'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/09', 'FEC14', 'A'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/39', 'EC251', 'B'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/39', 'CE201', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/39', 'CE203', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/39', 'CE205', 'C'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/39', 'CE207', 'A'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/39', 'FEC14', 'A'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/01', 'EC251', 'P'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/01', 'CE201', 'C'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/01', 'CE203', 'C'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/01', 'CE205', 'P'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/01', 'CE207', 'F'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/01', 'FEC16', 'A+'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/158', 'EC251', 'O'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/158', 'CE201', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/158', 'CE203', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/158', 'CE205', 'O'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/158', 'CE207', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/CE/158', 'FEC25', 'A'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/263', 'MA261', 'A'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/263', 'EE201', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/263', 'EE203', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/263', 'EE205', 'A'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/263', 'EE207a', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/263', 'FEC10', 'O'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/88', 'MA261', 'A'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/88', 'EE201', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/88', 'EE203', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/88', 'EE205', 'A+'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/88', 'EE207a', 'B+'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/88', 'FEC56', 'A+'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/87', 'MA261', 'B'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/87', 'EE201', 'P'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/87', 'EE203', 'B'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/87', 'EE205', 'P'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/87', 'EE207a', 'C'),
('O22_BTECH_III_REV_R1_1526', '2K21/EE/87', 'FEC9', 'B')
;
"""
    cur.execute(query)

