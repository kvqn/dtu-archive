
# This migration file was made by the scraper utility.
# Result PDF : E22_REV_BTECH_1447

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E22_REV_BTECH_1447', 2, {n_heirarchy})")

    query = """insert into result_student_details values
('E22_REV_BTECH_1447','2K21/A9/53', 'KUNAL SAH', 10, 2.82, 'MA102AP102 EE102 ', False),
('E22_REV_BTECH_1447','2K21/A10/37', 'SHIVAM DHAR', 18, 4.36, 'MA102', False),
('E22_REV_BTECH_1447','2K21/A10/48', 'SRIJAN SHANKAR', 16, 5.18, 'AP102  ME102,', False),
('E22_REV_BTECH_1447','2K21/B4/03', 'AAKASH PATEL', 22, 6.27, '', False),
('E22_REV_BTECH_1447','2K21/B4/10', 'ABHISHEK MADAAN', 2, 0.82, 'MA102AP102 AC102  ME104, ME106, FEC1,', False),
('E22_REV_BTECH_1447','2K21/B4/19', 'AIYASHA JANNAT', 18, 4.73, 'MA102', False),
('E22_REV_BTECH_1447','2K21/B4/26', 'ANKUR PRASAD', 18, 6.36, 'MA102', False),
('E22_REV_BTECH_1447','2K21/B4/36', 'AYAN JUNG CHAUDHARY', 22, 7.0, '', False),
('E22_REV_BTECH_1447','2K21/B4/42', 'BHUVNESH KUMAR UPADHYAY', 22, 6.55, '', False),
('E22_REV_BTECH_1447','2K21/B4/56', 'GAURAV SINGH DESHWAR', 10, 2.55, 'MA102 ME104, ME106, FEC1,', False),
('E22_REV_BTECH_1447','2K21/B4/71', 'SAIF AHMAD', 14, 3.82, 'MA102 ME104,', False),
('E22_REV_BTECH_1447','2K21/B4/74', 'RAJ DEVANSHU', 22, 7.64, '', False),
('E22_REV_BTECH_1447','2K21/B7/69', 'HITESH MEHRA', 22, 8.09, '', False),
('E22_REV_BTECH_1447','2K21/B17/26', 'KAMLESH PATEL', 22, 6.91, '', False),
('E22_REV_BTECH_1447','2K21/B18/02', 'ABHAY KAUSHIK', 22, 6.55, '', False),
('E22_REV_BTECH_1447','2K21/B18/08', 'AKAASH CHANDRA GIRI', 6, 2.09, 'MA102AP102 AC102  ME104,', False),
('E22_REV_BTECH_1447','2K21/B18/11', 'AMAN KAUSHIK', 14, 4.0, 'MA102 ME104,', False),
('E22_REV_BTECH_1447','2K21/B18/12', 'AMAN PAHADIA', 22, 6.55, '', False),
('E22_REV_BTECH_1447','2K21/B18/16', 'ARYAN RAJPUT', 22, 7.0, '', False),
('E22_REV_BTECH_1447','2K21/B18/50', 'RAGHAV KHURANA', 22, 8.82, '', False),
('E22_REV_BTECH_1447','2K21/B18/65', 'SOHAIL AKHTAR', 10, 2.91, 'MA102AC102  ME104,', False),
('E22_REV_BTECH_1447','2K21/B18/79', 'YOGESH KUMAR', 22, 8.91, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E22_REV_BTECH_1447', '2K21/A9/53', 'MA102', 'F'),
('E22_REV_BTECH_1447', '2K21/A9/53', 'AP102', 'F'),
('E22_REV_BTECH_1447', '2K21/A9/53', 'EE102', 'F'),
('E22_REV_BTECH_1447', '2K21/A9/53', 'CO102', 'C'),
('E22_REV_BTECH_1447', '2K21/A9/53', 'ME102', 'B'),
('E22_REV_BTECH_1447', '2K21/A9/53', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/A9/53', 'FEC7', 'B'),
('E22_REV_BTECH_1447', '2K21/A10/37', 'MA102', 'F'),
('E22_REV_BTECH_1447', '2K21/A10/37', 'AP102', 'C'),
('E22_REV_BTECH_1447', '2K21/A10/37', 'EE102', 'P'),
('E22_REV_BTECH_1447', '2K21/A10/37', 'CO102', 'C'),
('E22_REV_BTECH_1447', '2K21/A10/37', 'ME102', 'P'),
('E22_REV_BTECH_1447', '2K21/A10/37', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/A10/37', 'FEC15', 'B+'),
('E22_REV_BTECH_1447', '2K21/A10/48', 'MA102', 'B'),
('E22_REV_BTECH_1447', '2K21/A10/48', 'AP102', 'F'),
('E22_REV_BTECH_1447', '2K21/A10/48', 'EE102', 'B'),
('E22_REV_BTECH_1447', '2K21/A10/48', 'CO102', 'A'),
('E22_REV_BTECH_1447', '2K21/A10/48', 'ME102', 'F'),
('E22_REV_BTECH_1447', '2K21/A10/48', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/A10/48', 'FEC32', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/03', 'MA102', 'P'),
('E22_REV_BTECH_1447', '2K21/B4/03', 'AP102', 'C'),
('E22_REV_BTECH_1447', '2K21/B4/03', 'AC102', 'B'),
('E22_REV_BTECH_1447', '2K21/B4/03', 'ME104', 'B+'),
('E22_REV_BTECH_1447', '2K21/B4/03', 'ME106', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/03', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B4/03', 'FEC15', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/10', 'MA102', 'I'),
('E22_REV_BTECH_1447', '2K21/B4/10', 'AP102', 'I'),
('E22_REV_BTECH_1447', '2K21/B4/10', 'AC102', 'I'),
('E22_REV_BTECH_1447', '2K21/B4/10', 'ME104', 'F'),
('E22_REV_BTECH_1447', '2K21/B4/10', 'ME106', 'F'),
('E22_REV_BTECH_1447', '2K21/B4/10', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B4/10', 'FEC1', 'I'),
('E22_REV_BTECH_1447', '2K21/B4/19', 'MA102', 'F'),
('E22_REV_BTECH_1447', '2K21/B4/19', 'AP102', 'P'),
('E22_REV_BTECH_1447', '2K21/B4/19', 'AC102', 'C'),
('E22_REV_BTECH_1447', '2K21/B4/19', 'ME104', 'C'),
('E22_REV_BTECH_1447', '2K21/B4/19', 'ME106', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/19', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B4/19', 'FEC15', 'B+'),
('E22_REV_BTECH_1447', '2K21/B4/26', 'MA102', 'F'),
('E22_REV_BTECH_1447', '2K21/B4/26', 'AP102', 'B'),
('E22_REV_BTECH_1447', '2K21/B4/26', 'AC102', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/26', 'ME104', 'B+'),
('E22_REV_BTECH_1447', '2K21/B4/26', 'ME106', 'O'),
('E22_REV_BTECH_1447', '2K21/B4/26', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B4/26', 'FEC22', 'A+'),
('E22_REV_BTECH_1447', '2K21/B4/36', 'MA102', 'C'),
('E22_REV_BTECH_1447', '2K21/B4/36', 'AP102', 'C'),
('E22_REV_BTECH_1447', '2K21/B4/36', 'AC102', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/36', 'ME104', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/36', 'ME106', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/36', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B4/36', 'FEC3', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/42', 'MA102', 'B+'),
('E22_REV_BTECH_1447', '2K21/B4/42', 'AP102', 'B+'),
('E22_REV_BTECH_1447', '2K21/B4/42', 'AC102', 'P'),
('E22_REV_BTECH_1447', '2K21/B4/42', 'ME104', 'B'),
('E22_REV_BTECH_1447', '2K21/B4/42', 'ME106', 'B+'),
('E22_REV_BTECH_1447', '2K21/B4/42', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B4/42', 'FEC15', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/56', 'MA102', 'F'),
('E22_REV_BTECH_1447', '2K21/B4/56', 'AP102', 'P'),
('E22_REV_BTECH_1447', '2K21/B4/56', 'AC102', 'C'),
('E22_REV_BTECH_1447', '2K21/B4/56', 'ME104', 'F'),
('E22_REV_BTECH_1447', '2K21/B4/56', 'ME106', 'F'),
('E22_REV_BTECH_1447', '2K21/B4/56', 'MS199', 'O'),
('E22_REV_BTECH_1447', '2K21/B4/56', 'FEC1', 'F'),
('E22_REV_BTECH_1447', '2K21/B4/71', 'MA102', 'F'),
('E22_REV_BTECH_1447', '2K21/B4/71', 'AP102', 'C'),
('E22_REV_BTECH_1447', '2K21/B4/71', 'AC102', 'B'),
('E22_REV_BTECH_1447', '2K21/B4/71', 'ME104', 'F'),
('E22_REV_BTECH_1447', '2K21/B4/71', 'ME106', 'C'),
('E22_REV_BTECH_1447', '2K21/B4/71', 'MS199', 'O'),
('E22_REV_BTECH_1447', '2K21/B4/71', 'FEC9', 'C'),
('E22_REV_BTECH_1447', '2K21/B4/74', 'MA102', 'A+'),
('E22_REV_BTECH_1447', '2K21/B4/74', 'AP102', 'B'),
('E22_REV_BTECH_1447', '2K21/B4/74', 'AC102', 'B+'),
('E22_REV_BTECH_1447', '2K21/B4/74', 'ME104', 'B+'),
('E22_REV_BTECH_1447', '2K21/B4/74', 'ME106', 'A'),
('E22_REV_BTECH_1447', '2K21/B4/74', 'MS199', 'O'),
('E22_REV_BTECH_1447', '2K21/B4/74', 'FEC18', 'A'),
('E22_REV_BTECH_1447', '2K21/B7/69', 'MA102', 'A'),
('E22_REV_BTECH_1447', '2K21/B7/69', 'AP102', 'A'),
('E22_REV_BTECH_1447', '2K21/B7/69', 'AC102', 'B+'),
('E22_REV_BTECH_1447', '2K21/B7/69', 'ME104', 'A'),
('E22_REV_BTECH_1447', '2K21/B7/69', 'ME106', 'A+'),
('E22_REV_BTECH_1447', '2K21/B7/69', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B7/69', 'FEC7', 'A+'),
('E22_REV_BTECH_1447', '2K21/B17/26', 'MA102', 'A+'),
('E22_REV_BTECH_1447', '2K21/B17/26', 'AP102', 'B'),
('E22_REV_BTECH_1447', '2K21/B17/26', 'AC102', 'C'),
('E22_REV_BTECH_1447', '2K21/B17/26', 'ME104', 'B+'),
('E22_REV_BTECH_1447', '2K21/B17/26', 'ME106', 'A'),
('E22_REV_BTECH_1447', '2K21/B17/26', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B17/26', 'FEC7', 'C'),
('E22_REV_BTECH_1447', '2K21/B18/02', 'MA102', 'P'),
('E22_REV_BTECH_1447', '2K21/B18/02', 'AP102', 'C'),
('E22_REV_BTECH_1447', '2K21/B18/02', 'AC102', 'B+'),
('E22_REV_BTECH_1447', '2K21/B18/02', 'ME104', 'A'),
('E22_REV_BTECH_1447', '2K21/B18/02', 'ME106', 'A'),
('E22_REV_BTECH_1447', '2K21/B18/02', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/02', 'FEC7', 'B+'),
('E22_REV_BTECH_1447', '2K21/B18/08', 'MA102', 'F'),
('E22_REV_BTECH_1447', '2K21/B18/08', 'AP102', 'F'),
('E22_REV_BTECH_1447', '2K21/B18/08', 'AC102', 'F'),
('E22_REV_BTECH_1447', '2K21/B18/08', 'ME104', 'F'),
('E22_REV_BTECH_1447', '2K21/B18/08', 'ME106', 'A'),
('E22_REV_BTECH_1447', '2K21/B18/08', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/08', 'FEC1', 'B'),
('E22_REV_BTECH_1447', '2K21/B18/11', 'MA102', 'F'),
('E22_REV_BTECH_1447', '2K21/B18/11', 'AP102', 'C'),
('E22_REV_BTECH_1447', '2K21/B18/11', 'AC102', 'C'),
('E22_REV_BTECH_1447', '2K21/B18/11', 'ME104', 'F'),
('E22_REV_BTECH_1447', '2K21/B18/11', 'ME106', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/11', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/11', 'FEC7', 'B'),
('E22_REV_BTECH_1447', '2K21/B18/12', 'MA102', 'B'),
('E22_REV_BTECH_1447', '2K21/B18/12', 'AP102', 'C'),
('E22_REV_BTECH_1447', '2K21/B18/12', 'AC102', 'B'),
('E22_REV_BTECH_1447', '2K21/B18/12', 'ME104', 'B+'),
('E22_REV_BTECH_1447', '2K21/B18/12', 'ME106', 'A'),
('E22_REV_BTECH_1447', '2K21/B18/12', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/12', 'FEC7', 'B+'),
('E22_REV_BTECH_1447', '2K21/B18/16', 'MA102', 'P'),
('E22_REV_BTECH_1447', '2K21/B18/16', 'AP102', 'B'),
('E22_REV_BTECH_1447', '2K21/B18/16', 'AC102', 'B+'),
('E22_REV_BTECH_1447', '2K21/B18/16', 'ME104', 'A'),
('E22_REV_BTECH_1447', '2K21/B18/16', 'ME106', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/16', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/16', 'FEC7', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/50', 'MA102', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/50', 'AP102', 'O'),
('E22_REV_BTECH_1447', '2K21/B18/50', 'AC102', 'A'),
('E22_REV_BTECH_1447', '2K21/B18/50', 'ME104', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/50', 'ME106', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/50', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/50', 'FEC7', 'B+'),
('E22_REV_BTECH_1447', '2K21/B18/65', 'MA102', 'F'),
('E22_REV_BTECH_1447', '2K21/B18/65', 'AP102', 'P'),
('E22_REV_BTECH_1447', '2K21/B18/65', 'AC102', 'F'),
('E22_REV_BTECH_1447', '2K21/B18/65', 'ME104', 'F'),
('E22_REV_BTECH_1447', '2K21/B18/65', 'ME106', 'A'),
('E22_REV_BTECH_1447', '2K21/B18/65', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/65', 'FEC27', 'B+'),
('E22_REV_BTECH_1447', '2K21/B18/79', 'MA102', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/79', 'AP102', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/79', 'AC102', 'A'),
('E22_REV_BTECH_1447', '2K21/B18/79', 'ME104', 'O'),
('E22_REV_BTECH_1447', '2K21/B18/79', 'ME106', 'O'),
('E22_REV_BTECH_1447', '2K21/B18/79', 'MS199', 'A+'),
('E22_REV_BTECH_1447', '2K21/B18/79', 'FEC7', 'B+')
;
"""
    cur.execute(query)

