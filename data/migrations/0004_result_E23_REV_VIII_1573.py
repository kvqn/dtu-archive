
# This migration file was made by the scraper utility.
# Result PDF : E23_REV_VIII_1573

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('E23_REV_VIII_1573', 8, {n_heirarchy})")

    query = """insert into result_student_details values
('E23_REV_VIII_1573','2K19/EC/207', 'VIBHOR GAUTAM', 20, 8.2, '', False),
('E23_REV_VIII_1573','2K19/ME/002', 'AAKASH MEHTA', 18, 9.0, '', False),
('E23_REV_VIII_1573','2K19/SE/075', 'MOIN AHMAD CHALKOO', 24, 9.33, '', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('E23_REV_VIII_1573', '2K19/EC/207', 'AE416', 'A+'),
('E23_REV_VIII_1573', '2K19/EC/207', 'HU306', 'A+'),
('E23_REV_VIII_1573', '2K19/EC/207', 'EC402', 'B+'),
('E23_REV_VIII_1573', '2K19/EC/207', 'MOOC402*', 'A+'),
('E23_REV_VIII_1573', '2K19/EC/207', 'MOOC404*', 'A+'),
('E23_REV_VIII_1573', '2K19/ME/002', 'HU412', 'A+'),
('E23_REV_VIII_1573', '2K19/ME/002', 'ME420', 'A+'),
('E23_REV_VIII_1573', '2K19/ME/002', 'ME402', 'A+'),
('E23_REV_VIII_1573', '2K19/ME/002', 'MOOC402*', 'A+'),
('E23_REV_VIII_1573', '2K19/SE/075', 'HU404', 'O'),
('E23_REV_VIII_1573', '2K19/SE/075', 'MOOC402*', 'A+'),
('E23_REV_VIII_1573', '2K19/SE/075', 'MOOC404*', 'A+'),
('E23_REV_VIII_1573', '2K19/SE/075', 'SE406', 'O'),
('E23_REV_VIII_1573', '2K19/SE/075', 'SE418', 'A+'),
('E23_REV_VIII_1573', '2K19/SE/075', 'SE402', 'A+')
;
"""
    cur.execute(query)

