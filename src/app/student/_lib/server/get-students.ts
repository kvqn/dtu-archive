import { sql } from "@/lib/sql"

export type Student = {
  name: string
  old: string
  new: string | null
}

export async function getAllStudents(): Promise<Student[]> {
  const students = await sql<Student>(
    `
WITH 
NEW as (
select
	new
from
	rollnos
),
NAMES as (
select
	name,
	rollno
from
	result_student_details
group by
	rollno
),
ALL_BUT_NEW as (
select
	name,
	rollno
from
	NAMES
where
	rollno not in (
	select
		new
	from
		NEW)
),
WITH_NEW as (
select
	name,
	rollno as old,
	new
from
	ALL_BUT_NEW
left join rollnos on
	ALL_BUT_NEW.rollno = rollnos.old )
select
	*
from
	WITH_NEW
        `
  )
  return students
}
