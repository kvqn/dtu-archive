
# This migration file was made by the scraper utility.
# Result PDF : O22_REV_BTECH_7_1521

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O22_REV_BTECH_7_1521', 7, {n_heirarchy})")

    query = """insert into result_student_details values
('O22_REV_BTECH_7_1521','2K18/CE/134', 'TATHAGAT RAGHUVANSHI', 22, 9.82, '', False),
('O22_REV_BTECH_7_1521','2K18/CO/113', 'BRIJESH', 0, 4.47, 'BT323CO425,', False),
('O22_REV_BTECH_7_1521','2K17/CO/362', 'UTKARSH JHA', 8, 5.0, '', False),
('O22_REV_BTECH_7_1521','2K19/CO/443', 'YASHASWINI YERAMALLI', 26, 9.08, '', False),
('O22_REV_BTECH_7_1521','2K18/CO/098', 'ARYAN VERMA', 4, 7.0, '', False),
('O22_REV_BTECH_7_1521','2K18/EE/098', 'LAKSHAY YADAV', 18, 7.45, '', False),
('O22_REV_BTECH_7_1521','2K18/EP/068', 'RUDRA PRATAP SINGH', 4, 5.71, '', False),
('O22_REV_BTECH_7_1521','2K17/EP/510', 'SHIVAM CHAUDHARY', 10, 2.55, 'CE415  MBEALS2, PE417,', False),
('O22_REV_BTECH_7_1521','2K18/EP/015', 'ANURAG SHUKLA', 4, 1.33, 'EP401EP403, MOOC401,', False),
('O22_REV_BTECH_7_1521','2K15/EN/34', 'PAWAN KUMAR', 4, 1.43, 'EN401EN403, CO425,', False),
('O22_REV_BTECH_7_1521','2K18/EN/035', 'ROWNAK BANSAL', 22, 8.45, '', False),
('O22_REV_BTECH_7_1521','2K20/ME/501', 'ADITYA KUMAR', 22, 9.27, '', False),
('O22_REV_BTECH_7_1521','2K18/AE/024', 'JAYANT DIXIT', 18, 8.33, '', False),
('O22_REV_BTECH_7_1521','2K18/PS/010', 'ANKIT RAJ', 22, 8.27, '', False),
('O22_REV_BTECH_7_1521','2K18/PS/022', 'LUCKY CHOUDHARY', 22, 7.0, '', False),
('O22_REV_BTECH_7_1521','2K17/PE/34', 'NISHANTA HAZARIKA', 22, 6.0, '', False),
('O22_REV_BTECH_7_1521','2K18/SE/139', 'ATIQULLAH QADERI', 22, 7.27, '', False),
('O22_REV_BTECH_7_1521','2K18/SE/064', 'HARSH BERWAL', 16, 3.85, 'SE401SE403  MOOC401, MOOC403,', False),
('O22_REV_BTECH_7_1521','2K16/SE/69', 'SACHIN KUMAR', 22, 6.83, '', False),
('O22_REV_BTECH_7_1521','2K19/SE/063', 'KRISH SAINI', 18, 6.91, 'SE427,', False),
('O22_REV_BTECH_7_1521','2K18/SE/107', 'RUPIN GOEL', 12, 4.44, 'SE401SE403,', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O22_REV_BTECH_7_1521', '2K18/CE/134', 'CE401', 'O'),
('O22_REV_BTECH_7_1521', '2K18/CE/134', 'CE403', 'O'),
('O22_REV_BTECH_7_1521', '2K18/CE/134', 'CE415', 'O'),
('O22_REV_BTECH_7_1521', '2K18/CE/134', 'CE429', 'O'),
('O22_REV_BTECH_7_1521', '2K18/CE/134', 'HU313', 'O'),
('O22_REV_BTECH_7_1521', '2K18/CE/134', 'MOOC401', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/CE/134', 'MOOC403', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/CO/113', 'BT323', 'F'),
('O22_REV_BTECH_7_1521', '2K18/CO/113', 'CO425', 'F'),
('O22_REV_BTECH_7_1521', '2K17/CO/362', 'CO325', 'P'),
('O22_REV_BTECH_7_1521', '2K17/CO/362', 'CO425', 'C'),
('O22_REV_BTECH_7_1521', '2K19/CO/443', 'CO401', 'A'),
('O22_REV_BTECH_7_1521', '2K19/CO/443', 'CO403', 'O'),
('O22_REV_BTECH_7_1521', '2K19/CO/443', 'MS499', 'A+'),
('O22_REV_BTECH_7_1521', '2K19/CO/443', 'CO425', 'A+'),
('O22_REV_BTECH_7_1521', '2K19/CO/443', 'CO433', 'A+'),
('O22_REV_BTECH_7_1521', '2K19/CO/443', 'HU315', 'O'),
('O22_REV_BTECH_7_1521', '2K19/CO/443', 'PE353a', 'A+'),
('O22_REV_BTECH_7_1521', '2K19/CO/443', 'MOOC401', 'A+'),
('O22_REV_BTECH_7_1521', '2K19/CO/443', 'MOOC403', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/CO/098', 'CO411', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/EE/098', 'EE401', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/EE/098', 'EE403', 'A'),
('O22_REV_BTECH_7_1521', '2K18/EE/098', 'EE407', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/EE/098', 'EE409', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/EE/098', 'EN421', 'B'),
('O22_REV_BTECH_7_1521', '2K18/EP/068', 'BT413', 'B'),
('O22_REV_BTECH_7_1521', '2K17/EP/510', 'EP401', 'B'),
('O22_REV_BTECH_7_1521', '2K17/EP/510', 'EP403', 'A'),
('O22_REV_BTECH_7_1521', '2K17/EP/510', 'CE415', 'F'),
('O22_REV_BTECH_7_1521', '2K17/EP/510', 'HU403', 'P'),
('O22_REV_BTECH_7_1521', '2K17/EP/510', 'MBEALS2', 'F'),
('O22_REV_BTECH_7_1521', '2K17/EP/510', 'PE417', 'F'),
('O22_REV_BTECH_7_1521', '2K18/EP/015', 'EP401', 'F'),
('O22_REV_BTECH_7_1521', '2K18/EP/015', 'EP403', 'F'),
('O22_REV_BTECH_7_1521', '2K18/EP/015', 'CO327', 'P'),
('O22_REV_BTECH_7_1521', '2K18/EP/015', 'MOOC401', 'F'),
('O22_REV_BTECH_7_1521', '2K15/EN/34', 'EN401', 'F'),
('O22_REV_BTECH_7_1521', '2K15/EN/34', 'EN403', 'F'),
('O22_REV_BTECH_7_1521', '2K15/EN/34', 'CE423', 'C'),
('O22_REV_BTECH_7_1521', '2K15/EN/34', 'CO425', 'F'),
('O22_REV_BTECH_7_1521', '2K18/EN/035', 'EN401', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/EN/035', 'EN403', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/EN/035', 'EN409', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/EN/035', 'EN411', 'O'),
('O22_REV_BTECH_7_1521', '2K18/EN/035', 'EN421', 'A'),
('O22_REV_BTECH_7_1521', '2K18/EN/035', 'MOOC401', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/EN/035', 'MOOC403', 'A+'),
('O22_REV_BTECH_7_1521', '2K20/ME/501', 'ME401', 'A+'),
('O22_REV_BTECH_7_1521', '2K20/ME/501', 'ME403', 'O'),
('O22_REV_BTECH_7_1521', '2K20/ME/501', 'IT321', 'A+'),
('O22_REV_BTECH_7_1521', '2K20/ME/501', 'IT427', 'O'),
('O22_REV_BTECH_7_1521', '2K20/ME/501', 'ME407', 'A+'),
('O22_REV_BTECH_7_1521', '2K20/ME/501', 'MOOC401', 'A+'),
('O22_REV_BTECH_7_1521', '2K20/ME/501', 'MOOC403', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/AE/024', 'AE401', 'O'),
('O22_REV_BTECH_7_1521', '2K18/AE/024', 'AE403', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/AE/024', 'AE307', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/AE/024', 'CO201', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/AE/024', 'CO203', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/PS/010', 'PT401', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/PS/010', 'PT403', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/PS/010', 'PT405', 'A'),
('O22_REV_BTECH_7_1521', '2K18/PS/010', 'PT407', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/PS/010', 'CH407', 'B'),
('O22_REV_BTECH_7_1521', '2K18/PS/010', 'CH417', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/PS/022', 'PT401', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/PS/022', 'PT403', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/PS/022', 'PT405', 'B'),
('O22_REV_BTECH_7_1521', '2K18/PS/022', 'PT407', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/PS/022', 'CH407', 'C'),
('O22_REV_BTECH_7_1521', '2K18/PS/022', 'CH417', 'B+'),
('O22_REV_BTECH_7_1521', '2K17/PE/34', 'PE401', 'B+'),
('O22_REV_BTECH_7_1521', '2K17/PE/34', 'PE403', 'B'),
('O22_REV_BTECH_7_1521', '2K17/PE/34', 'PE353a', 'P'),
('O22_REV_BTECH_7_1521', '2K17/PE/34', 'PE361a', 'C'),
('O22_REV_BTECH_7_1521', '2K17/PE/34', 'PE417', 'C'),
('O22_REV_BTECH_7_1521', '2K17/PE/34', 'MOOC401', 'A+'),
('O22_REV_BTECH_7_1521', '2K17/PE/34', 'MOOC403', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/SE/139', 'SE401', 'A'),
('O22_REV_BTECH_7_1521', '2K18/SE/139', 'SE403', 'A'),
('O22_REV_BTECH_7_1521', '2K18/SE/139', 'HU307', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/SE/139', 'HU409', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/SE/139', 'SE409', 'C'),
('O22_REV_BTECH_7_1521', '2K18/SE/139', 'MOOC401', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/SE/139', 'MOOC403', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/SE/064', 'SE401', 'F'),
('O22_REV_BTECH_7_1521', '2K18/SE/064', 'SE403', 'F'),
('O22_REV_BTECH_7_1521', '2K18/SE/064', 'IT407', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/SE/064', 'SE409', 'C'),
('O22_REV_BTECH_7_1521', '2K18/SE/064', 'SE427', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/SE/064', 'SE429', 'B'),
('O22_REV_BTECH_7_1521', '2K18/SE/064', 'MOOC401', 'F'),
('O22_REV_BTECH_7_1521', '2K18/SE/064', 'MOOC403', 'F'),
('O22_REV_BTECH_7_1521', '2K16/SE/69', 'SE401', 'A+'),
('O22_REV_BTECH_7_1521', '2K16/SE/69', 'SE403', 'B+'),
('O22_REV_BTECH_7_1521', '2K16/SE/69', 'IT407', 'C'),
('O22_REV_BTECH_7_1521', '2K16/SE/69', 'SE427', 'C'),
('O22_REV_BTECH_7_1521', '2K16/SE/69', 'SE429', 'C'),
('O22_REV_BTECH_7_1521', '2K16/SE/69', 'MOOC401', 'A+'),
('O22_REV_BTECH_7_1521', '2K16/SE/69', 'MOOC403', 'A+'),
('O22_REV_BTECH_7_1521', '2K19/SE/063', 'SE401', 'A'),
('O22_REV_BTECH_7_1521', '2K19/SE/063', 'SE403', 'A'),
('O22_REV_BTECH_7_1521', '2K19/SE/063', 'MS499', 'A+'),
('O22_REV_BTECH_7_1521', '2K19/SE/063', 'SE409', 'A+'),
('O22_REV_BTECH_7_1521', '2K19/SE/063', 'SE425', 'A'),
('O22_REV_BTECH_7_1521', '2K19/SE/063', 'SE427', 'F'),
('O22_REV_BTECH_7_1521', '2K19/SE/063', 'MOOC401', 'A+'),
('O22_REV_BTECH_7_1521', '2K19/SE/063', 'MOOC403', 'A+'),
('O22_REV_BTECH_7_1521', '2K18/SE/107', 'SE401', 'F'),
('O22_REV_BTECH_7_1521', '2K18/SE/107', 'SE403', 'F'),
('O22_REV_BTECH_7_1521', '2K18/SE/107', 'SE409', 'B+'),
('O22_REV_BTECH_7_1521', '2K18/SE/107', 'SE425', 'C'),
('O22_REV_BTECH_7_1521', '2K18/SE/107', 'SE427', 'A')
;
"""
    cur.execute(query)

