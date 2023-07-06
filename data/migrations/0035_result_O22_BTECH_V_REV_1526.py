
# This migration file was made by the scraper utility.
# Result PDF : O22_BTECH_V_REV_1526

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O22_BTECH_V_REV_1526', 5, {n_heirarchy})")

    query = """insert into result_student_details values
('O22_BTECH_V_REV_1526','2K20/CO/257', 'MANJEET VATS', 23, 9.48, '', False),
('O22_BTECH_V_REV_1526','2K20/EN/68', 'SHREYA', 23, 7.87, '', False),
('O22_BTECH_V_REV_1526','2K20/IT/62', 'IZNA', 23, 8.13, '', False),
('O22_BTECH_V_REV_1526','2K20/PE/34', 'MOHIT RAJ', 23, 8.7, '', False),
('O22_BTECH_V_REV_1526','2K20/PE/07', 'ADITYA MATHUR', 19, 5.68, '', False),
('O22_BTECH_V_REV_1526','2K20/SE/22', 'ANUJ BORICHA', 27, 8.56, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O22_BTECH_V_REV_1526', '2K20/CO/257', 'CO301', 'O'),
('O22_BTECH_V_REV_1526', '2K20/CO/257', 'CO303', 'O'),
('O22_BTECH_V_REV_1526', '2K20/CO/257', 'HU301a', 'O'),
('O22_BTECH_V_REV_1526', '2K20/CO/257', 'MS399', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/CO/257', 'BBA202', 'A'),
('O22_BTECH_V_REV_1526', '2K20/CO/257', 'CO313', 'O'),
('O22_BTECH_V_REV_1526', '2K20/CO/257', 'CO425', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/EN/68', 'EN301', 'A'),
('O22_BTECH_V_REV_1526', '2K20/EN/68', 'EN303', 'B+'),
('O22_BTECH_V_REV_1526', '2K20/EN/68', 'HU301a', 'B+'),
('O22_BTECH_V_REV_1526', '2K20/EN/68', 'MS399', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/EN/68', 'CO427', 'A'),
('O22_BTECH_V_REV_1526', '2K20/EN/68', 'HU413', 'A'),
('O22_BTECH_V_REV_1526', '2K20/EN/68', 'MOOC301', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/EN/68', 'MOOC303', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/IT/62', 'IT301', 'A'),
('O22_BTECH_V_REV_1526', '2K20/IT/62', 'IT303', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/IT/62', 'HU301a', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/IT/62', 'MS399', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/IT/62', 'CO313', 'B+'),
('O22_BTECH_V_REV_1526', '2K20/IT/62', 'EN421', 'B+'),
('O22_BTECH_V_REV_1526', '2K20/IT/62', 'PE353a', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/PE/34', 'PE301', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/PE/34', 'PE303', 'A'),
('O22_BTECH_V_REV_1526', '2K20/PE/34', 'MG301', 'A'),
('O22_BTECH_V_REV_1526', '2K20/PE/34', 'MS399', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/PE/34', 'ME351a', 'O'),
('O22_BTECH_V_REV_1526', '2K20/PE/34', 'ME411', 'A'),
('O22_BTECH_V_REV_1526', '2K20/PE/34', 'PE353a', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/PE/07', 'PE301', 'C'),
('O22_BTECH_V_REV_1526', '2K20/PE/07', 'PE303', 'B'),
('O22_BTECH_V_REV_1526', '2K20/PE/07', 'MG301', 'P'),
('O22_BTECH_V_REV_1526', '2K20/PE/07', 'MS399', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/PE/07', 'PE353a', 'P'),
('O22_BTECH_V_REV_1526', '2K20/PE/07', 'MOOC301', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/PE/07', 'MOOC303', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/SE/22', 'SE301a', 'A'),
('O22_BTECH_V_REV_1526', '2K20/SE/22', 'SE303a', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/SE/22', 'HU301a', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/SE/22', 'MS399', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/SE/22', 'CO313', 'A'),
('O22_BTECH_V_REV_1526', '2K20/SE/22', 'CO427', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/SE/22', 'PE353a', 'A'),
('O22_BTECH_V_REV_1526', '2K20/SE/22', 'MOOC301', 'A+'),
('O22_BTECH_V_REV_1526', '2K20/SE/22', 'MOOC303', 'A+')
;
"""
    cur.execute(query)

