import { sql } from "@/lib/sql"
import { prisma } from "@/prisma"

type StudentGrade = {
  result: string
  semester: number
  subject_code: string
  subject_name: string
  credits: number
  grade: string
}

type StudentGradeWithoutSubjectDetails = Omit<
  StudentGrade,
  "subject_name" | "credits"
>

export async function getStudentGrades(
  rollno: string
): Promise<StudentGrade[]> {
  const grades: StudentGradeWithoutSubjectDetails[] = (
    await sql(
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
)
select
	*
from
	CORRECT_RESULT
order by semester, subject
`
    )
  ).map((row: any) => {
    return {
      result: row["result"],
      semester: row["semester"],
      subject_code: row["subject"],
      grade: row["grade"],
    }
  })

  const subject_details = await prisma.subjectDetails.findMany()
  const subject_map = new Map<string, { name: string; credits: number }>()

  for (const subject of subject_details) {
    subject_map.set(subject.code, {
      name: subject.name,
      credits: subject.credits,
    })
  }

  const grades_with_subject_details = grades.map((grade) => {
    const subject_details = subject_map.get(grade.subject_code)
    return {
      ...grade,
      subject_name: subject_details?.name ?? "-- Unknown -- ",
      credits: subject_details?.credits ?? 4,
    }
  })

  return grades_with_subject_details
}
