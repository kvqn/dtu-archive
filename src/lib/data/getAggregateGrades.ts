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

export type AggregateResult = {
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
      cgpa: number
      credits: number
    }[]
    totalCredits: number
    cgpa: number
    rank: number
  }[]
}

export async function getAggregateResult(
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
MAX_HEIRARCHY as (
select
	latest_rollno,
	subject,
	max(heirarchy) as max_heirarchy
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
	MAX_HEIRARCHY
inner join result_heirarchy on
	heirarchy = max_heirarchy
),
FINAL_RESULT as (
select
	*
FROM
	CORRECT_BATCH
natural join CORRECT_RESULT
),
WITH_CREDITS as (
select
	FINAL_RESULT.*,
	ifnull(subject_details.credits, 4) as credits
from
	FINAL_RESULT
left join subject_details on
	FINAL_RESULT.subject = subject_details.code
)
select
	latest_rollno,
	subject,
	grade,
	semester,
	credits
from
	WITH_CREDITS;
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
      semester.cgpa += grade.credits * gradeValue(grade.grade)
      semester.credits += grade.credits
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
        cgpa: grade.credits * gradeValue(grade.grade),
        credits: grade.credits,
      })
    }

    student.totalCredits += grade.credits
    student.cgpa += grade.credits * gradeValue(grade.grade)
  }

  for (const rollno of Array.from(students.keys())) {
    const student = students.get(rollno)!
    student.cgpa /= student.totalCredits
    for (const semester of student.semesters) {
      semester.cgpa /= semester.credits
    }
  }

  const students_list = Array.from(students.values()).sort(
    (a, b) => b.cgpa - a.cgpa
  )
  for (let i = 0; i < students_list.length; i++) {
    students_list[i].rank = i + 1
    students_list[i].semesters.sort((a, b) => a.semester - b.semester)
  }

  return {
    students: students_list,
  }
}
