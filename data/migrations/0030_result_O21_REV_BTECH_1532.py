
# This migration file was made by the scraper utility.
# Result PDF : O21_REV_BTECH_1532

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O21_REV_BTECH_1532', 5, {n_heirarchy})")

    query = """insert into result_student_details values
('O21_REV_BTECH_1532','2K19/EC/019', 'ANKIT KEMWAL', 23, 8.96, '', False),
('O21_REV_BTECH_1532','2K19/EC/024', 'ANSHUMANI SHARMA', 23, 8.96, '', False),
('O21_REV_BTECH_1532','2K19/EC/044', 'CHETAN SHAHRA', 23, 9.0, '', False),
('O21_REV_BTECH_1532','2K19/EC/021', 'ANSH RAJ', 23, 8.3, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O21_REV_BTECH_1532', '2K19/EC/019', 'CO203', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/019', 'EC301', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/019', 'EC303', 'A'),
('O21_REV_BTECH_1532', '2K19/EC/019', 'HU301a', 'O'),
('O21_REV_BTECH_1532', '2K19/EC/019', 'EC311', 'A'),
('O21_REV_BTECH_1532', '2K19/EC/019', 'EC315', 'O'),
('O21_REV_BTECH_1532', '2K19/EC/024', 'IT201', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/024', 'EC301', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/024', 'EC303', 'A'),
('O21_REV_BTECH_1532', '2K19/EC/024', 'HU301a', 'O'),
('O21_REV_BTECH_1532', '2K19/EC/024', 'CO327', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/024', 'EC311', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/044', 'IT201', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/044', 'EC301', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/044', 'EC303', 'A'),
('O21_REV_BTECH_1532', '2K19/EC/044', 'HU301a', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/044', 'CO327', 'O'),
('O21_REV_BTECH_1532', '2K19/EC/044', 'EC311', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/021', 'IT201', 'A'),
('O21_REV_BTECH_1532', '2K19/EC/021', 'EC301', 'A'),
('O21_REV_BTECH_1532', '2K19/EC/021', 'EC303', 'A'),
('O21_REV_BTECH_1532', '2K19/EC/021', 'HU301a', 'A+'),
('O21_REV_BTECH_1532', '2K19/EC/021', 'EC311', 'A'),
('O21_REV_BTECH_1532', '2K19/EC/021', 'EC315', 'A+')
;
"""
    cur.execute(query)

