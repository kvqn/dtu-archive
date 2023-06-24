type AggregateStudent = {
  rollno: string
  name: string
  cgpas: (number|null)[]
  aggregate: number
}

type AggregateResult = {
  n_students: number
  semesters: number[]
  students: AggregateStudent[]
}

type SemesterStudent = {
  rollno: string
  name: string
  grades: (string|null)[]
  subjects: (string|null)[]
  tc: number
  cgpa: number
  failed_papers: string[]
}

type SemesterResult = {
  n_students: number
  subjects: string[]
  students: SemesterStudent[]
}
