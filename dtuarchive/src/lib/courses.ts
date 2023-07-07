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
  const courses = await query_result(
    `select unique(subject) as course from result_grades`
  )
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
          const a_heirarchy = results.find(
            (r) => r.result === a.result
          )?.heirarchy
          const b_heirarchy = results.find(
            (r) => r.result === b.result
          )?.heirarchy
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

export type CourseTableData = {
  course: string
  n_students: number
  average: string
  median: string
  ninety_percentile: string
  ninety_five_percentile: string
  ninety_nine_percentile: string
}

export async function getCoursesTableData(): Promise<CourseTableData[]> {
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

  const course_data: CourseTableData[] = []

  for (const course of courses) {
    const course_grades = relevant_grades.filter(
      (grade) => grade.subject == course
    )
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
    let ninety_percentile =
      course_grades[Math.floor(course_grades.length * 0.9)].grade
    let ninety_five_percentile =
      course_grades[Math.floor(course_grades.length * 0.95)].grade
    let ninety_nine_percentile =
      course_grades[Math.floor(course_grades.length * 0.99)].grade

    course_data.push({
      course: course,
      n_students: course_grades.length,
      average: average.toFixed(2),
      median: median,
      ninety_percentile: ninety_percentile,
      ninety_five_percentile: ninety_five_percentile,
      ninety_nine_percentile: ninety_nine_percentile
    })
  }

  return course_data
}
