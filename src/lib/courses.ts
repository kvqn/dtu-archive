// Courses related data fetching and calculations
import { get_result_heirarchy } from "./data"
import { query_result } from "./sql"

const gradeValues: Map<string, number> = new Map([
  ["O", 10],
  ["A+", 9],
  ["A", 8],
  ["B+", 7],
  ["B", 6],
  ["C", 5],
  ["P", 4],
  ["F", 0]
])

export function grade_value(grade: string): number {
  return gradeValues.get(grade) || 0
}

export async function getAllCourses(): Promise<string[]> {
  const courses = await query_result(`select unique(subject) as course from result_grades`)
  return courses.map((course: any) => course["course"])
}

export async function isValidCourse(course: string): Promise<boolean> {
  const courses = await getAllCourses()
  return courses.includes(course)
}

type CourseGrade = {
  result: string
  grade: string
  rollno: string
}

export async function getCourseGrades(course: string): Promise<CourseGrade[]> {
  const grades: {
    result: string
    rollno: string
    grade: string
  }[] = (
    await query_result(`
  select result, ifnull(rollnos.new, result_grades.rollno) as rollno, grade from result_grades
  left join rollnos on rollnos.old = result_grades.rollno
  where subject = '${course}'
                        `)
  ).map((result: any) => {
    return {
      result: result["result"],
      rollno: result["rollno"],
      grade: result["grade"]
    }
  })
  const results = await get_result_heirarchy()

  const relevant_grades: CourseGrade[] = []

  const considered_grades: Set<string> = new Set()

  for (const grade of grades) {
    if (considered_grades.has(grade.rollno)) continue

    considered_grades.add(grade.rollno)

    relevant_grades.push(
      grades
        .filter((g) => g.rollno === grade.rollno)
        .sort((a, b) => {
          const a_heirarchy = results.find((r) => r.result === a.result)?.heirarchy
          const b_heirarchy = results.find((r) => r.result === b.result)?.heirarchy
          // @ts-ignore
          return b_heirarchy - a_heirarchy
        })[0]
    )
  }

  relevant_grades.sort((a, b) => {
    const gradeA = gradeValues.get(a.grade)
    const gradeB = gradeValues.get(b.grade)
    if (gradeA && gradeB) return gradeB - gradeA
    return 0
  })

  return relevant_grades
}

export type CourseTableDataPercentiles = {
  course: string
  n_students: number
  average: string
  median: string
  seventy_percentile: string
  eighty_percentile: string
  ninety_percentile: string
}

export async function getCoursesTableDataPercentiles(): Promise<CourseTableDataPercentiles[]> {
  const grades: {
    result: string
    rollno: string
    subject: string
    grade: string
  }[] = (
    await query_result(`
  select result, ifnull(rollnos.new, result_grades.rollno) as rollno, subject, grade from result_grades
  left join rollnos on rollnos.old = result_grades.rollno
                        `)
  ).map((result: any) => {
    return {
      result: result["result"],
      subject: result["subject"],
      rollno: result["rollno"],
      grade: result["grade"]
    }
  })

  const relevant_grades: typeof grades = grades

  const courses = await getAllCourses()

  const course_data: CourseTableDataPercentiles[] = []

  for (const course of courses) {
    const course_grades = relevant_grades.filter((grade) => grade.subject == course)
    course_grades.sort((a, b) => {
      const gradeA = gradeValues.get(a.grade)
      const gradeB = gradeValues.get(b.grade)
      if (gradeA != undefined && gradeB != undefined) return gradeA - gradeB
      return 0
    })

    if (course_grades.length == 0) continue

    let average = 0
    for (const grade of course_grades) {
      average += grade_value(grade.grade)
    }
    average /= course_grades.length

    let median = course_grades[Math.floor(course_grades.length / 2)].grade
    let seventy_percentile = course_grades[Math.floor(course_grades.length * 0.7)].grade
    let eighty_percentile = course_grades[Math.floor(course_grades.length * 0.8)].grade
    let ninety_percentile = course_grades[Math.floor(course_grades.length * 0.9)].grade

    course_data.push({
      course: course,
      n_students: course_grades.length,
      average: average.toFixed(2),
      median: median,
      seventy_percentile: seventy_percentile,
      eighty_percentile: eighty_percentile,
      ninety_percentile: ninety_percentile
    })
  }

  return course_data
}

export type CourseTableDataCount = {
  course: string
  n_students: number
  average: string
  o: string
  a_plus: string
  a: string
  b_plus: string
  b: string
  c: string
  p: string
  f: string
}

export async function getCoursesTableDataCount(): Promise<CourseTableDataCount[]> {
  const grades: {
    result: string
    rollno: string
    subject: string
    grade: string
  }[] = (
    await query_result(`
  select result, ifnull(rollnos.new, result_grades.rollno) as rollno, subject, grade from result_grades
  left join rollnos on rollnos.old = result_grades.rollno
                        `)
  ).map((result: any) => {
    return {
      result: result["result"],
      subject: result["subject"],
      rollno: result["rollno"],
      grade: result["grade"]
    }
  })

  const relevant_grades: typeof grades = grades

  const courses = await getAllCourses()

  const course_data: CourseTableDataCount[] = []

  for (const course of courses) {
    const course_grades = relevant_grades.filter((grade) => grade.subject == course)

    if (course_grades.length == 0) continue

    let average = 0
    for (const grade of course_grades) {
      average += grade_value(grade.grade)
    }
    average /= course_grades.length

    let o = 0
    let a_plus = 0
    let a = 0
    let b_plus = 0
    let b = 0
    let c = 0
    let p = 0
    let f = 0

    for (const grade of course_grades) {
      switch (grade.grade) {
        case "O":
          o++
          break
        case "A+":
          a_plus++
          break
        case "A":
          a++
          break
        case "B+":
          b_plus++
          break
        case "B":
          b++
          break
        case "C":
          c++
          break
        case "P":
          p++
          break
        default:
          f++
          break
      }
    }

    o = (o / course_grades.length) * 100
    a_plus = (a_plus / course_grades.length) * 100
    a = (a / course_grades.length) * 100
    b_plus = (b_plus / course_grades.length) * 100
    b = (b / course_grades.length) * 100
    c = (c / course_grades.length) * 100
    p = (p / course_grades.length) * 100
    f = (f / course_grades.length) * 100

    course_data.push({
      course: course,
      n_students: course_grades.length,
      average: average.toFixed(2),
      o: o.toFixed(2) + " %",
      a_plus: a_plus.toFixed(2) + " %",
      a: a.toFixed(2) + " %",
      b_plus: b_plus.toFixed(2) + " %",
      b: b.toFixed(2) + " %",
      c: c.toFixed(2) + " %",
      p: p.toFixed(2) + " %",
      f: f.toFixed(2) + " %"
    })
  }

  return course_data
}
