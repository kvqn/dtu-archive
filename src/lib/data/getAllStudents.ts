import { query_result } from "../sql"

export type Student = {
  name: string
  old: string
  new: string | null
}

export async function getAllStudents() {
  const students: Student[] = (
    await query_result(
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
  ).map((row: any) => {
    return {
      name: row.name,
      old: row.old,
      new: row.new,
    }
  })

  return students
}
