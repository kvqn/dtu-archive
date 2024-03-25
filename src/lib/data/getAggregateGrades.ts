import { query_result } from "../sql"
import { gradeValue } from "../utils"
import { getLatestNamesFromBranch } from "./getLatestNames"

type AggregateGradesRaw = {
  latest_rollno: string
  subject: string
  grade: string
  semester: number
  credits: number
}

type AggregateResult = {
  students: {
    name: string
    rollno: string
    semesters: {
      semester: number
      subjects: {
        subject: string
        grade: string
        credits: number
      }[]
    }[]
    totalCredits: number
    cgpa: number
    rank: number
  }[]
}

export async function getAggregateGrades(
  batch: string,
  branch: string
): Promise<AggregateResult> {
  const rawGrades: AggregateGradesRaw[] = (
    await query_result(`
with 
LATEST_ROLLNO as (
select
	result,
	ifnull(rollnos.new, result_grades.rollno) as latest_rollno,
	subject,
	grade
from
	result_grades
left join rollnos on
	result_grades.rollno = rollnos.old
),
CORRECT_BATCH as (
select
	*
from
	LATEST_ROLLNO
where
	latest_rollno rlike '${batch}/${branch}/.*'
),
MIN_HEIRARCHY as (
select
	latest_rollno,
	subject,
	min(heirarchy) as min_heirarchy
from
	CORRECT_BATCH
natural join result_heirarchy
group by
	latest_rollno,
	subject
),
CORRECT_RESULT as (
select
	result,
	latest_rollno,
	subject,
	semester
from
	MIN_HEIRARCHY
inner join result_heirarchy on
	heirarchy = min_heirarchy
),
FINAL_RESULT as (
select
	*,
	4 as credits
FROM
	CORRECT_BATCH
natural join CORRECT_RESULT
)
select
	latest_rollno,
	subject,
	grade,
	semester,
	credits
from
	FINAL_RESULT;
    `)
  ).map((x: any) => ({
    latest_rollno: x["latest_rollno"],
    subject: x["subject"],
    grade: x["grade"],
    semester: x["semester"],
    credits: x["credits"],
  }))

  const names = await getLatestNamesFromBranch(batch, branch)

  const students = new Map<string, AggregateResult["students"][number]>()

  for (const { rollno, name } of names) {
    const student: AggregateResult["students"][number] = {
      rollno: rollno,
      name: name,
      semesters: [],
      totalCredits: 0,
      cgpa: 0,
      rank: 0,
    }
    students.set(rollno, student)
  }

  for (const grade of rawGrades) {
    const student = students.get(grade.latest_rollno)
    if (!student) {
      continue
    }

    const semester = student.semesters.find(
      (x) => x.semester === grade.semester
    )

    if (semester) {
      semester.subjects.push({
        subject: grade.subject,
        grade: grade.grade,
        credits: grade.credits,
      })
    } else {
      student.semesters.push({
        semester: grade.semester,
        subjects: [
          {
            subject: grade.subject,
            grade: grade.grade,
            credits: grade.credits,
          },
        ],
      })
    }

    student.totalCredits += grade.credits
    student.cgpa += grade.credits * gradeValue(grade.grade)
  }

  for (const rollno of Array.from(students.keys())) {
    const student = students.get(rollno)!
    student.cgpa /= student.totalCredits
  }

  return {
    students: Array.from(students.values()),
  }
}
