type AggregateStudent = {
  rollno: string
  name: string
  cgpas: number[]
  aggregate: number
}

type AggregateResult = {
  n_students: number
  n_semesters: number
  students: AggregateStudent[]
}

type SemesterStudent = {
  rollno: string
  name: string
  grades: string[]
  tc: number
  cgpa: number
  failed_papers: string[]
}

type SemesterResult = {
  n_students: number
  subjects: string[]
  students: SemesterStudent[]
}
