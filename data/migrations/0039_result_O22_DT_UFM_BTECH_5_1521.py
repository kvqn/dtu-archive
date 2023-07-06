
# This migration file was made by the scraper utility.
# Result PDF : O22_DT_UFM_BTECH_5_1521

def migration(cur):

    cur.execute("select min(heirarchy) from result_heirarchy")
    result = cur.fetchall()
    if (result[0][0] is None):
        n_heirarchy = 1
    else:
        n_heirarchy = result[0][0] - 1

    cur.execute(f"insert into result_heirarchy values ('O22_DT_UFM_BTECH_5_1521', 5, {n_heirarchy})")

    query = """insert into result_student_details values
('O22_DT_UFM_BTECH_5_1521','2K20/CE/135', 'SALIM AHMADZAI', 0, 0.0, 'CE301CE303 MG301  CE305, CE315, EN305,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/CE/145', 'SHIVAM PANDEY', 19, 5.09, 'CE317,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/CE/107', 'OBAID JAFARALI MOOLIMANI', 23, 7.57, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/CE/20', 'ADITYA RAJ', 23, 5.48, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/CE/64', 'HARSHIT SHARMA', 23, 7.13, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/CE/120', 'RAJAT SAINI', 0, 0.0, 'CE301CE303 MG301  CE317, CE321, CE325,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/CE/101', 'NIKHIL KUMAR KAGDA', 15, 3.74, 'CE301 EN305,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/CO/310', 'NITISH KASHNIA', 23, 7.43, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/CO/216', 'JIVESH ANAND', 23, 7.3, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/CO/171', 'GAUTAM CHANDERWAL', 19, 5.11, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EE/313', 'YOGESH', 8, 1.93, 'EE301EE303 HU301a  CE309, EE305,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EE/100', 'GANDHI ISHAN RAHUL', 15, 4.52, 'IT425, PE353a,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EE/299', 'VARUN MEHRA', 23, 5.22, 'EN317,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EE/303', 'VIPAN KUMAR', 0, 0.0, 'EN309, EN421, ME361,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EC/196', 'SHASHANK GAUTAM', 19, 3.74, 'CE309,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EC/216', 'SURYANSH SHARMA', 0, 0.0, 'EC301EC303 HU301a  CO327, EC455, SE429,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EP/56', 'HRITIK YADAV', 0, 0.0, 'EP301EP303 MG301  EP305, MBAMK219,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EP/32', 'ASHISH CHAHAR', 3, 0.79, 'EP301EP303  EP415, EP419,', True),
('O22_DT_UFM_BTECH_5_1521','2K20/EN/34', 'FATOU SAIDY', 0, 0.0, 'BT323EN301 EN303  HU301a, EN421,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EN/08', 'AKHIL PARMAR', 0, 0.0, 'EN301EN303 HU301a  MOOC301, MOOC303,', True),
('O22_DT_UFM_BTECH_5_1521','2K20/EN/64', 'SARVAGYA VERMA', 23, 5.57, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EN/04', 'AAYUSH KHERA', 19, 4.39, 'EN301', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EN/79', 'VISHAL RAJPUT', 19, 5.3, 'EN317,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EN/69', 'SHUBH MITTAL', 19, 6.96, 'EN317,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EN/40', 'LAKSHAY GARG', 19, 4.61, 'EN301 ', False),
('O22_DT_UFM_BTECH_5_1521','2K20/EN/39', 'LAKSHAY AGGARWAL', 23, 5.93, 'EN317,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/IT/36', 'AVDHESH KUMAR SINGH', 23, 7.39, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/MC/03', 'ABHINAV ANAND', 23, 6.83, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/MC/24', 'ANNU YADAV', 23, 8.48, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/ME/160', 'MONU', 19, 4.91, 'CE309,', False),
('O22_DT_UFM_BTECH_5_1521','2K20/ME/254', 'SHAGUN MAURYA', 23, 8.04, '', False),
('O22_DT_UFM_BTECH_5_1521','2K20/PE/51', 'SAMARTH SHUKLA', 0, 0.0, 'PE301PE303 MG301  CE309, PE361a,', False)
;
"""
    cur.execute(query)

    query = """insert into result_grades values
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/135', 'CE301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/135', 'CE303', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/135', 'MG301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/135', 'CE305', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/135', 'CE315', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/135', 'EN305', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/145', 'CE301', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/145', 'CE303', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/145', 'MG301', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/145', 'CE305', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/145', 'CE317', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/145', 'MBASC213', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/107', 'CE301', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/107', 'CE303', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/107', 'MG301', 'O'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/107', 'CE305', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/107', 'CE321', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/107', 'MBA-107', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/20', 'CE301', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/20', 'CE303', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/20', 'MG301', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/20', 'CE309', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/20', 'CE317', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/20', 'EN301', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/64', 'CE301', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/64', 'CE303', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/64', 'MG301', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/64', 'CE309', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/64', 'CE319', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/64', 'IT323', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/120', 'CE301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/120', 'CE303', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/120', 'MG301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/120', 'CE317', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/120', 'CE321', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/120', 'CE325', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/101', 'CE301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/101', 'CE303', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/101', 'MG301', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/101', 'CE321', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/101', 'CE325', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CE/101', 'EN305', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/310', 'CO301', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/310', 'CO303', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/310', 'HU301a', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/310', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/310', 'CO313', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/310', 'MC317', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/310', 'MOOC301', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/310', 'MOOC303', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/216', 'CO301', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/216', 'CO303', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/216', 'HU301a', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/216', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/216', 'CO327', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/216', 'CO425', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/216', 'MOOC301', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/216', 'MOOC303', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/171', 'CO301', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/171', 'CO303', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/171', 'HU301a', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/171', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/171', 'CO327', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/CO/171', 'IT425', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/313', 'EE301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/313', 'EE303', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/313', 'HU301a', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/313', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/313', 'CE309', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/313', 'EE305', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/313', 'ME351a', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/313', 'ME353a', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/100', 'EE301', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/100', 'EE303', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/100', 'HU301a', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/100', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/100', 'CO425', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/100', 'IT425', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/100', 'PE353a', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/299', 'EE301', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/299', 'EE303', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/299', 'HU301a', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/299', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/299', 'CO427', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/299', 'EE327', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/299', 'EN317', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/299', 'MOOC301', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/299', 'MOOC303', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/303', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/303', 'EN309', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/303', 'EN421', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EE/303', 'ME361', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/196', 'EC301', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/196', 'EC303', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/196', 'HU301a', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/196', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/196', 'CE309', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/196', 'EC313', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/196', 'SE313', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/216', 'EC301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/216', 'EC303', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/216', 'HU301a', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/216', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/216', 'CO327', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/216', 'EC455', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EC/216', 'SE429', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/56', 'EP301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/56', 'EP303', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/56', 'MG301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/56', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/56', 'EP305', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/56', 'MBAMK219', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/32', 'EP301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/32', 'EP303', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/32', 'MG301', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/32', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/32', 'EP351a', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EP/32', 'EP415', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/34', 'BT323', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/34', 'EN301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/34', 'EN303', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/34', 'HU301a', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/34', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/34', 'EN421', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/08', 'EN301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/08', 'EN303', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/08', 'HU301a', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/08', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/08', 'CE201', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/08', 'MOOC301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/64', 'EN301', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/64', 'EN303', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/64', 'HU301a', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/64', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/64', 'CO201', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/64', 'CO301', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/64', 'EN305', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/04', 'EN301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/04', 'EN303', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/04', 'HU301a', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/04', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/04', 'CO305', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/04', 'EN311', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/04', 'EN317', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/79', 'EN301', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/79', 'EN303', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/79', 'HU301a', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/79', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/79', 'EN317', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/79', 'HU309', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/79', 'HU353a', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/69', 'EN301', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/69', 'EN303', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/69', 'HU301a', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/69', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/69', 'EN317', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/69', 'HU313', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/69', 'HU315', 'O'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/40', 'EN309', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/40', 'EN301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/40', 'EN303', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/40', 'HU301a', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/40', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/40', 'IT201', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/40', 'IT323', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/39', 'HU305', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/39', 'EN301', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/39', 'EN303', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/39', 'HU301a', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/39', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/39', 'EN311', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/39', 'EN317', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/EN/39', 'HU309', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/IT/36', 'IT301', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/IT/36', 'IT303', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/IT/36', 'HU301a', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/IT/36', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/IT/36', 'HU313', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/IT/36', 'HU403', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/IT/36', 'IT325', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/03', 'MC301', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/03', 'MC303', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/03', 'MG301', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/03', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/03', 'MBA-107', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/03', 'MBAMK219', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/03', 'MOOC301', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/03', 'MOOC303', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/24', 'MC301', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/24', 'MC303', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/24', 'MG301', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/24', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/24', 'MBA-107', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/24', 'MBAMK219', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/24', 'MOOC301', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/MC/24', 'MOOC303', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/160', 'ME301', 'B'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/160', 'ME303', 'P'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/160', 'MG301', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/160', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/160', 'CE309', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/160', 'ME353a', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/160', 'ME423', 'C'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/254', 'ME301', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/254', 'ME303', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/254', 'MG301', 'B+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/254', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/254', 'CO201', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/254', 'CO205', 'A'),
('O22_DT_UFM_BTECH_5_1521', '2K20/ME/254', 'ME353a', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/PE/51', 'PE301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/PE/51', 'PE303', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/PE/51', 'MG301', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/PE/51', 'MS399', 'A+'),
('O22_DT_UFM_BTECH_5_1521', '2K20/PE/51', 'CE309', 'F'),
('O22_DT_UFM_BTECH_5_1521', '2K20/PE/51', 'PE361a', 'F')
;
"""
    cur.execute(query)

