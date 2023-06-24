import { existsSync } from "fs"
import { readFile, readdir } from "fs/promises"

import conn from "./sql"

const DATA_DIR = "public/data"

export async function isValidBatch(batch: string): Promise<boolean> {
  const batches = await getBatches()
  return batches.includes(batch)
}

export async function getBatches(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    conn.query("select unique substring(rollno, 1, 4) as batch from result_student_details", (err, result) => {
      if (err) reject(err)
      resolve(result.map((row: any) => row["batch"]))
    })
  })
}

export async function isValidBranch(batch: string, branch: string): Promise<boolean> {
  const branches = await getBranches(batch)
  return branches?.includes(branch) ?? false
}

export async function getBranches(batch: string): Promise<string[] | null> {
  if (!(await isValidBatch(batch))) return null
  return new Promise((resolve, reject) => {
    conn.query(
      `select unique regexp_substr(rollno, '(?<=\/)[a-zA-Z]+') as branch from result_student_details where substring(rollno, 1, 4) = '${batch}'`,
      (err, result) => {
        if (err) reject(err)
        resolve(result.map((row: any) => row["branch"]))
      }
    )
  })
}

export async function isValidSemester(batch: string, branch: string, semester: string): Promise<boolean> {
  const semesters = await getSemesters(batch, branch)
  return semesters?.includes(parseInt(semester)) ?? false
}

export async function getSemesters(batch: string, branch: string): Promise<number[] | null> {
  if (!(await isValidBranch(batch, branch))) return null
  return new Promise((resolve, reject) => {
    conn.query(
      `select distinct semester from result_heirarchy where result in (select unique result from result_student_details where substring(rollno, 1, 4) = '${batch}' and regexp_substr(rollno, '(?<=\/)[a-zA-Z]+') = '${branch}')`
      , (err, result) => {
        if (err) reject(err)
        resolve(result.map((row: any) => row["semester"]))
      }
    )
  })
}

export async function getSemesterResult(
  batch: string,
  branch: string,
  semester: string
): Promise<SemesterResult | null> {
  if (!(await isValidSemester(batch, branch, semester))) return null

  const details = await _get_semeseter_details(batch, branch, semester)
  const grades = await _get_semester_grades(batch, branch, semester)

  let subject_columns = 0
  for (const student of details) {
    const student_grades = grades.filter((grade) => grade.rollno === student.rollno)
    if (student_grades.length > subject_columns) {
      subject_columns = student_grades.length
    }
  }

  const semester_students: SemesterStudent[] = []
  for (const student of details) {
    const semester_student: SemesterStudent = {
      rollno: student.rollno,
      name: student.name,
      grades: [],
      subjects: [],
      tc: student.tc,
      cgpa: student.cgpa,
      failed_papers: student.failed_subjects.split(","),
    }

    const student_grades = grades.filter((grade) => grade.rollno === student.rollno)

    semester_student.subjects = student_grades.map((grade) => grade.subject)
    if (semester_student.subjects.length < subject_columns) {
      for (let i = semester_student.subjects.length; i < subject_columns; i++) {
        semester_student.subjects.push(null)
      }
    }

    semester_student.grades = student_grades.map((grade) => grade.grade)
    if (semester_student.grades.length < subject_columns) {
      for (let i = semester_student.grades.length; i < subject_columns; i++) {
        semester_student.grades.push(null)
      }
    }

    semester_students.push(semester_student)

  }

  const subjects: string[] = []
  for (let i = 0; i < subject_columns; i++) {
    subjects.push(`Subject ${i + 1}`)
  }

  const semester_result: SemesterResult = {
    n_students: details.length,
    subjects: subjects,
    students: semester_students,
  }

  return semester_result

}

type _SemesterDetails = {
  result: string,
  rollno: string,
  name: string,
  tc: number,
  cgpa: number,
  failed_subjects: string,
}

async function _get_semeseter_details(
  batch: string,
  branch: string,
  semester: string
): Promise<_SemesterDetails[]> {
  // Assumes that the semester is valid
  return new Promise((resolve, reject) => {
    conn.query(
      `select * from view_latest_details where result in (select result from result_heirarchy where semester = ${semester}) and rollno regexp '${batch}\/${branch}\/'`,
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

type _SemesterGrades = {
  result: string,
  rollno: string,
  subject: string,
  grade: string,
}

async function _get_semester_grades(
  batch: string,
  branch: string,
  semester: string
): Promise<_SemesterGrades[]> {
  // Assumes that the semester is valid
  return new Promise((resolve, reject) => {
    conn.query(
      `select * from view_latest_grades where result in (select result from result_heirarchy where semester = ${semester}) and rollno regexp '${batch}\/${branch}\/'`,
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

export async function getAggregateResult(batch: string, branch: string): Promise<AggregateResult | null> {
  if (!(await isValidBranch(batch, branch))) return null
  const text = await readFile(`${DATA_DIR}/${batch}/${branch}/aggregate-result.json`, "utf-8")
  const result = JSON.parse(text)
  return result
}
