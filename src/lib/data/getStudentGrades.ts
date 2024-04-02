import { query_result } from "../sql"

type StudentGrade = {
  result: string
  semester: number
  subject_code: string
  subject_name: string
  credits: number
  grade: string
}

export async function getStudentGrades(
  rollno: string
): Promise<StudentGrade[]> {
  const grades: StudentGrade[] = (
    await query_result(
      `
with 
ROLLS as (
select '${rollno}' as rollno
union
select new from rollnos where old = '${rollno}'
union
select old from rollnos where new = '${rollno}'
),
GRADES as (
select
	result,
	subject,
	grade
from
	result_grades
where
	rollno in (
	select
		rollno
	from
		ROLLS)
),
WITH_HEIRARCHY as (
select
	*
from
	GRADES
natural join result_heirarchy
),
MAX_HEIRARCHY as (
select
	semester,
	subject,
	max(heirarchy) as max_heirarchy
from
	WITH_HEIRARCHY
group by
	semester,
	subject
),
CORRECT_RESULT as (
select
	WITH_HEIRARCHY.result,
	WITH_HEIRARCHY.semester,
	WITH_HEIRARCHY.subject,
	WITH_HEIRARCHY.grade
from
	WITH_HEIRARCHY
inner join MAX_HEIRARCHY on
	heirarchy = max_heirarchy
	and WITH_HEIRARCHY.semester = MAX_HEIRARCHY.semester
	and WITH_HEIRARCHY.subject = MAX_HEIRARCHY.subject
),
WITH_CREDITS as (
select
	CORRECT_RESULT.*,
	subject_details.name as name,
	ifnull(subject_details.credits, 4) as credits
from
	CORRECT_RESULT
left join subject_details on
	subject = code
)
select
	*
from
	WITH_CREDITS
`
    )
  ).map((row: any) => {
    return {
      result: row["result"],
      semester: row["semester"],
      subject_code: row["subject"],
      subject_name: row["name"],
      credits: row["credits"],
      grade: row["grade"],
    }
  })

  return grades
}
