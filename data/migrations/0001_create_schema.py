# This is the first migration file.
# Define the schema here. Try not to change it in future migrations.

def migration(cur):
    cur.execute("""
create table rollnos(
  old char(16) primary key,
  new char(16) unique not null,
  constraint old_new_not_same check (old <> new),
  constraint old_not_empty check (old <> ''),
  constraint new_not_empty check (new <> '')
);""")

    cur.execute("""
create table result_heirarchy(
  result char(100) primary key,
  semester smallint not null,
  heirarchy int auto_increment unique not null,
  constraint result_not_empty check (result <> ''),
  constraint semester_positive check (semester > 0)
);
""")

    cur.execute("""
create table result_student_details(
  result char(100) not null,
  rollno char(20) not null,
  name char(100) not null,
  tc smallint,
  cgpa float,
  failed_subjects varchar(100),
  bad boolean not null,
  primary key(result, rollno),
  foreign key(result) references result_heirarchy(result),
  constraint name_not_empty check (name <> '')
);
""")

    cur.execute("""
create table result_grades(
  result char(100) not null,
  rollno char(16) not null,
  subject char(10) not null,
  grade char(3) not null,
  primary key(result, rollno, subject),
  foreign key(result, rollno) references result_student_details(result, rollno),
  constraint subject_not_empty check (subject <> ''),
  constraint grade_not_empty check (grade <> '')
);
""")

    cur.execute("""
create table migrations (name varchar(255) primary key);
""")

