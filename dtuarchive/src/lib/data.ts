import { existsSync } from "fs"
import { readFile, readdir } from "fs/promises"

import conn, { ResultGrades, ResultHeirarchy, ResultStudentDetails } from "./sql"

const DATA_DIR = "public/data"

function round_to_two_places(num: number) {
  return Math.round(num * 100 + Number.EPSILON) / 100
}

export async function isValidBatch(batch: string): Promise<boolean> {
  const batches = await getBatches()
  return batches.includes(batch)
}

export async function getBatches(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    conn.query("select unique substring(rollno, 1, 4) as batch from result_student_details order by batch desc", (err, result) => {
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
      `select unique regexp_substr(rollno, '(?<=\/)[a-zA-Z0-9]+') as branch from result_student_details where substring(rollno, 1, 4) = '${batch}' order by branch asc`,
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
      `select distinct semester from result_heirarchy where result in (select unique result from result_student_details where substring(rollno, 1, 4) = '${batch}' and regexp_substr(rollno, '(?<=\/)[a-zA-Z0-9]+') = '${branch}')`,
      (err, result) => {
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
      failed_papers: student.failed_subjects.split(",")
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
    students: semester_students
  }

  return semester_result
}

async function _get_semeseter_details(batch: string, branch: string, semester: string): Promise<ResultStudentDetails[]> {
  // Assumes that the semester is valid
  const details: ResultStudentDetails[] =  await new Promise((resolve, reject) => {
    conn.query(
      `select * from result_student_details where rollno regexp '${batch}\/${branch}\/' and result in (select result from result_heirarchy where semester = ${semester})`,
      (err, result) => {
        if (err) reject(err)
        resolve(result.map((row : any) => {
          return {
            result: row["result"],
            rollno: row["rollno"],
            name: row["name"],
            tc: row["tc"],
            cgpa: row["cgpa"],
            failed_subjects: row["failed_subjects"]
          }
        }))
      }
    )
  })

  const results : ResultHeirarchy[] = await new Promise((resolve, reject) => {
    conn.query(
      `select result, heirarchy from result_heirarchy where semester = ${semester}`,
      (err, result) => {
        if (err) reject(err)
        resolve(result.map((row : any) => {
          return {
            result: row["result"],
            heirarchy: row["heirarchy"]
          }
        }))
      }
    )
  })

  results.sort((a: any, b: any) => b["heirarchy"] - a["heirarchy"])

  const relevant_details: ResultStudentDetails[] = []

  const considered_students: Set<string> = new Set()

  for (const detail of details) {
    if (considered_students.has(detail.rollno)) continue

    relevant_details.push(details.filter((d) => d.rollno === detail.rollno).sort((a, b) => {
      const a_heirarchy = results.find((r) => r.result === a.result)?.heirarchy
      const b_heirarchy = results.find((r) => r.result === b.result)?.heirarchy
      // @ts-ignore
      return b_heirarchy - a_heirarchy
    })[0])

    considered_students.add(detail.rollno)
  }

  return relevant_details

}

async function _get_semester_grades(batch: string, branch: string, semester: string): Promise<ResultGrades[]> {
  // Assumes that the semester is valid
  const grades : ResultGrades[] = await new Promise((resolve, reject) => {
    conn.query(
      `select * from result_grades where rollno regexp '${batch}\/${branch}\/' and result in (select result from result_heirarchy where semester = ${semester})`,
      (err, result) => {
        if (err) reject(err)
        resolve(result.map((row : any) => {
          return {
            result: row["result"],
            rollno: row["rollno"],
            subject: row["subject"],
            grade: row["grade"]
          }
        }))
      }
    )
  })

  const results : ResultHeirarchy[] = await new Promise((resolve, reject) => {
    conn.query(
      `select result, heirarchy from result_heirarchy where semester = ${semester}`,
      (err, result) => {
        if (err) reject(err)
        resolve(result.map((row : any) => {
          return {
            result: row["result"],
            heirarchy: row["heirarchy"]
          }
        }))
      }
    )
  })

  results.sort((a: any, b: any) => b["heirarchy"] - a["heirarchy"])

  const relevant_grades: ResultGrades[] = []

  const considered_students: Set<{rollno: string, subject: string}> = new Set()

  for (const grade of grades) {
    if (considered_students.has({rollno: grade.rollno, subject: grade.subject})) continue

    relevant_grades.push(
      grades.filter((g) => g.rollno === grade.rollno && g.subject === grade.subject).sort((a, b) => {
        const a_heirarchy = results.find((r) => r.result === a.result)?.heirarchy
        const b_heirarchy = results.find((r) => r.result === b.result)?.heirarchy
        // @ts-ignore
        return b_heirarchy - a_heirarchy
      })[0]
    )

    considered_students.add({rollno: grade.rollno, subject: grade.subject})
  }

  return relevant_grades

}

export async function getAggregateResult(batch: string, branch: string): Promise<AggregateResult | null> {
  if (!(await isValidBranch(batch, branch))) return null

  const details = await _get_aggregate_details(batch, branch)
  const semesters_set = new Set<number>()

  for (const result of details) {
    semesters_set.add(result.semester)
  }

  const semesters = Array.from(semesters_set).sort()

  const aggregate_students: AggregateStudent[] = []
  const names = await _get_aggregate_names(batch, branch)

  for (const name of names) {
    const results = details.filter((result) => result.rollno === name.rollno)
    const cgpas = []
    let total_tc = 0
    let aggregate = 0
    for (const semester of semesters) {
      const result = results.find((result) => result.semester === semester)
      if (result) {
        cgpas.push(result.cgpa)
        total_tc += result.tc
        aggregate += result.cgpa * result.tc
      } else {
        cgpas.push(null)
      }
    }

    if (total_tc !== 0) {
      aggregate /= total_tc
    }

    const aggregate_student: AggregateStudent = {
      rollno: name.rollno,
      name: name.name,
      cgpas: cgpas,
      aggregate: round_to_two_places(aggregate)
    }

    aggregate_students.push(aggregate_student)
  }

  const aggregate_result: AggregateResult = {
    n_students: aggregate_students.length,
    semesters: semesters,
    students: aggregate_students
  }

  return aggregate_result
}

type _AggregateDetails = {
  result: string
  rollno: string
  semester: number
  cgpa: number
  tc: number
  bad: boolean
}

async function _get_aggregate_details(batch: string, branch: string): Promise<_AggregateDetails[]> {
  return new Promise((resolve, reject) => {
    conn.query(`select * from view_latest_aggregate where rollno regexp '${batch}\/${branch}\/'`, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

async function _get_aggregate_names(batch: string, branch: string): Promise<{ rollno: string; name: string }[]> {
  return new Promise((resolve, reject) => {
    conn.query(
      `select rollno, name from result_student_details where rollno regexp '${batch}\/${branch}\/' group by rollno`,
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}
