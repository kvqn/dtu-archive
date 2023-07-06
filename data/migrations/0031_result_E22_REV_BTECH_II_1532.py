
# This migration file was made by the scraper utility.
# Result PDF : E22_REV_BTECH_II_1532

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E22_REV_BTECH_II_1532', 2, {n_heirarchy})")

    query = """insert into result_student_details values
('E22_REV_BTECH_II_1532','2K21/B9/25', 'SAHIL KUMAR', 18, 4.91, 'MA102 MA102AP102, AC102,', False),
('E22_REV_BTECH_II_1532','2K21/B9/34', 'SARTHAK GARG', 2, 0.82, 'ME104, ME106, FEC7,', False),
('E22_REV_BTECH_II_1532','2K21/B9/46', 'SHRISTI JAYANT', 22, 7.09, '', False),
('E22_REV_BTECH_II_1532','2K21/B9/48', 'SHUBHAM MEENA', 22, 7.55, '', False),
('E22_REV_BTECH_II_1532','2K21/B9/57', 'SOUMYA MEENA', 18, 4.82, 'MA102', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E22_REV_BTECH_II_1532', '2K21/B9/25', 'MA102', 'F'),
('E22_REV_BTECH_II_1532', '2K21/B9/25', 'AP102', 'P'),
('E22_REV_BTECH_II_1532', '2K21/B9/25', 'AC102', 'C'),
('E22_REV_BTECH_II_1532', '2K21/B9/25', 'ME104', 'B'),
('E22_REV_BTECH_II_1532', '2K21/B9/25', 'ME106', 'A'),
('E22_REV_BTECH_II_1532', '2K21/B9/25', 'MS199', 'A+'),
('E22_REV_BTECH_II_1532', '2K21/B9/25', 'FEC7', 'B+'),
('E22_REV_BTECH_II_1532', '2K21/B9/34', 'MA102', 'F'),
('E22_REV_BTECH_II_1532', '2K21/B9/34', 'AP102', 'F'),
('E22_REV_BTECH_II_1532', '2K21/B9/34', 'AC102', 'F'),
('E22_REV_BTECH_II_1532', '2K21/B9/34', 'ME104', 'F'),
('E22_REV_BTECH_II_1532', '2K21/B9/34', 'ME106', 'F'),
('E22_REV_BTECH_II_1532', '2K21/B9/34', 'MS199', 'A+'),
('E22_REV_BTECH_II_1532', '2K21/B9/34', 'FEC7', 'F'),
('E22_REV_BTECH_II_1532', '2K21/B9/46', 'MA102', 'B+'),
('E22_REV_BTECH_II_1532', '2K21/B9/46', 'AP102', 'B+'),
('E22_REV_BTECH_II_1532', '2K21/B9/46', 'AC102', 'B'),
('E22_REV_BTECH_II_1532', '2K21/B9/46', 'ME104', 'B'),
('E22_REV_BTECH_II_1532', '2K21/B9/46', 'ME106', 'A+'),
('E22_REV_BTECH_II_1532', '2K21/B9/46', 'MS199', 'A+'),
('E22_REV_BTECH_II_1532', '2K21/B9/46', 'FEC7', 'A'),
('E22_REV_BTECH_II_1532', '2K21/B9/48', 'MA102', 'A'),
('E22_REV_BTECH_II_1532', '2K21/B9/48', 'AP102', 'A+'),
('E22_REV_BTECH_II_1532', '2K21/B9/48', 'AC102', 'B+'),
('E22_REV_BTECH_II_1532', '2K21/B9/48', 'ME104', 'B'),
('E22_REV_BTECH_II_1532', '2K21/B9/48', 'ME106', 'A'),
('E22_REV_BTECH_II_1532', '2K21/B9/48', 'MS199', 'A+'),
('E22_REV_BTECH_II_1532', '2K21/B9/48', 'FEC7', 'B'),
('E22_REV_BTECH_II_1532', '2K21/B9/57', 'MA102', 'F'),
('E22_REV_BTECH_II_1532', '2K21/B9/57', 'AP102', 'B'),
('E22_REV_BTECH_II_1532', '2K21/B9/57', 'AC102', 'C'),
('E22_REV_BTECH_II_1532', '2K21/B9/57', 'ME104', 'P'),
('E22_REV_BTECH_II_1532', '2K21/B9/57', 'ME106', 'A'),
('E22_REV_BTECH_II_1532', '2K21/B9/57', 'MS199', 'A+'),
('E22_REV_BTECH_II_1532', '2K21/B9/57', 'FEC7', 'B')
;
"""
    cur.execute(query)

