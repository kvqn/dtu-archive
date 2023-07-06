
# This migration file was made by the scraper utility.
# Result PDF : O21_REV_BTECH_I_1453

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O21_REV_BTECH_I_1453', 1, {n_heirarchy})")

    query = """insert into result_student_details values
('O21_REV_BTECH_I_1453','2K21/A2/66', 'ANSHUL AGRAWAL', 20, 9.2, '', False),
('O21_REV_BTECH_I_1453','2K21/A4/16', 'HARSHIT JAIN', 20, 9.4, '', False),
('O21_REV_BTECH_I_1453','2K21/A13/59', 'ARIN SINGHAL', 20, 8.2, '', False),
('O21_REV_BTECH_I_1453','2K21/A13/70', 'AYUSH SINGHAL', 20, 8.1, '', False),
('O21_REV_BTECH_I_1453','2K21/A16/40', 'DEEPA CHAURASIYA', 20, 8.0, '', False),
('O21_REV_BTECH_I_1453','2K21/A17/59', 'PRAVEEN KUMAR', 20, 8.1, '', False),
('O21_REV_BTECH_I_1453','2K21/B2/14', 'AYUSH', 20, 7.8, '', False),
('O21_REV_BTECH_I_1453','2K21/B6/03', 'UPASANA SINGH', 20, 7.9, '', False),
('O21_REV_BTECH_I_1453','2K21/B7/57', 'HARSH CHOUDHARY', 20, 8.4, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O21_REV_BTECH_I_1453', '2K21/A2/66', 'MA101', 'O'),
('O21_REV_BTECH_I_1453', '2K21/A2/66', 'AP101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A2/66', 'AC101', 'O'),
('O21_REV_BTECH_I_1453', '2K21/A2/66', 'ME101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A2/66', 'ME103', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A2/66', 'FEC10', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A4/16', 'MA101', 'O'),
('O21_REV_BTECH_I_1453', '2K21/A4/16', 'AP101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A4/16', 'AC101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A4/16', 'ME101', 'O'),
('O21_REV_BTECH_I_1453', '2K21/A4/16', 'ME103', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A4/16', 'FEC10', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A13/59', 'MA101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A13/59', 'AP101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A13/59', 'AC101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A13/59', 'ME101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A13/59', 'ME103', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A13/59', 'FEC10', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A13/70', 'MA101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A13/70', 'AP101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A13/70', 'AC101', 'B+'),
('O21_REV_BTECH_I_1453', '2K21/A13/70', 'ME101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A13/70', 'ME103', 'B'),
('O21_REV_BTECH_I_1453', '2K21/A13/70', 'FEC10', 'B+'),
('O21_REV_BTECH_I_1453', '2K21/A16/40', 'MA101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A16/40', 'AP101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A16/40', 'AC101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A16/40', 'ME101', 'B+'),
('O21_REV_BTECH_I_1453', '2K21/A16/40', 'ME103', 'O'),
('O21_REV_BTECH_I_1453', '2K21/A16/40', 'FEC10', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A17/59', 'MA101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A17/59', 'AP101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A17/59', 'AC101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/A17/59', 'ME101', 'B+'),
('O21_REV_BTECH_I_1453', '2K21/A17/59', 'ME103', 'A'),
('O21_REV_BTECH_I_1453', '2K21/A17/59', 'FEC10', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/B2/14', 'MA101', 'B+'),
('O21_REV_BTECH_I_1453', '2K21/B2/14', 'AP101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/B2/14', 'EE101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/B2/14', 'CO101', 'B+'),
('O21_REV_BTECH_I_1453', '2K21/B2/14', 'ME105', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/B2/14', 'FEC10', 'B+'),
('O21_REV_BTECH_I_1453', '2K21/B6/03', 'MA101', 'O'),
('O21_REV_BTECH_I_1453', '2K21/B6/03', 'AP101', 'B+'),
('O21_REV_BTECH_I_1453', '2K21/B6/03', 'EE101', 'B+'),
('O21_REV_BTECH_I_1453', '2K21/B6/03', 'CO101', 'B+'),
('O21_REV_BTECH_I_1453', '2K21/B6/03', 'ME105', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/B6/03', 'FEC10', 'A'),
('O21_REV_BTECH_I_1453', '2K21/B7/57', 'MA101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/B7/57', 'AP101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/B7/57', 'EE101', 'A'),
('O21_REV_BTECH_I_1453', '2K21/B7/57', 'CO101', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/B7/57', 'ME105', 'A+'),
('O21_REV_BTECH_I_1453', '2K21/B7/57', 'FEC10', 'B+')
;
"""
    cur.execute(query)

