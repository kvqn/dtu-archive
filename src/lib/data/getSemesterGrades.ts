import { SemesterResult } from "@/components/SemesterResult"

import { query_result } from "../sql"
import { gradeValue } from "../utils"
import { getLatestNamesFromBranch } from "./getLatestNames"

type SemesterResultGradesRaw = {
  result: string
  latest_rollno: string
  subject: string
  grade: string
  credits: number
}

export type SemesterResult = {
  students: {
    name: string
    rollno: string
    subjects: { subject: string; grade: string; credits: number }[]
    totalCredits: number
    cgpa: number
    rank: number
  }[]
}

export default async function getSemesterResult(
  batch: string,
  branch: string,
  semester: number
): Promise<SemesterResult> {
  // TODO: check input

  const rawGrades: SemesterResultGradesRaw[] = (
    await query_result(`
with 
CORRECT_SEMESTER as (
select
	*
from
	result_grades
natural join result_heirarchy
where
	semester = ${semester}
),
LATEST_ROLLNO as (
select
	result,
	ifnull(rollnos.new, CORRECT_SEMESTER.rollno) as latest_rollno,
	subject,
	grade
from
	CORRECT_SEMESTER
left join rollnos on
	CORRECT_SEMESTER.rollno = rollnos.old
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
	subject
from
	MAX_HEIRARCHY
inner join result_heirarchy on
	heirarchy = max_heirarchy
),
FINAL_RESULT as (
select
	*,
  4 as credits
from
	CORRECT_BATCH
natural join CORRECT_RESULT
)
select
	*
from
	FINAL_RESULT;
    `)
  ).map((row: any) => ({
    result: row["result"],
    latest_rollno: row["latest_rollno"],
    subject: row["subject"],
    grade: row["grade"],
    credits: row["credits"],
  }))

  const rawGradesMap = new Map<string, SemesterResultGradesRaw[]>()
  for (const row of rawGrades) {
    if (rawGradesMap.has(row.latest_rollno))
      rawGradesMap.get(row.latest_rollno)?.push(row)
    else rawGradesMap.set(row.latest_rollno, [row])
  }

  const names = await getLatestNamesFromBranch(batch, branch)

  const students: SemesterResult["students"] = []

  for (const { rollno, name } of names) {
    const student = {
      name: name,
      rollno: rollno,
      subjects: [] as { subject: string; grade: string; credits: number }[],
      totalCredits: 0,
      cgpa: 0,
      rank: 0,
    }

    if (!rawGradesMap.has(rollno)) continue
    for (const grade of rawGradesMap.get(rollno)!) {
      student.subjects.push({
        subject: grade.subject,
        grade: grade.grade,
        credits: grade.credits,
      })
      student.totalCredits += grade.credits
      student.cgpa += grade.credits * gradeValue(grade.grade)
    }
    student.cgpa /= student.totalCredits

    students.push(student)
  }

  students.sort((a, b) => b.cgpa - a.cgpa)
  for (let i = 0; i < students.length; i++) {
    students[i].rank = i + 1
  }

  return {
    students: students,
  }
}
