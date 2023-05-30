import Custom404 from "@/components/Custom404"
import {
  getBatches,
  getBranches,
  getSemesterResult,
  getSemesters
} from "@/lib/data"
import { useState } from "react"

type Props = {
  batch: string
  branch: string
  semester: number
  _result_original: SemesterResult
}

export const getStaticProps = async ({ params }: any) => {
  const { batch, branch, semester } = params
  const result = await getSemesterResult(batch, branch, semester)
  return {
    props: {
      batch: batch,
      branch: branch,
      semester: semester,
      _result_original: result
    }
  }
}

export const getStaticPaths = async () => {
  const paths = []
  const batches = await getBatches()
  for (const batch of batches) {
    const branches = await getBranches(batch)
    if (!branches) continue
    for (const branch of branches) {
      const semesters = await getSemesters(batch, branch)
      if (!semesters) continue
      for (let sem = 1; sem <= semesters; sem++) {
        paths.push({
          params: { batch: batch, branch: branch, semester: sem.toString() }
        })
      }
    }
  }

  return { paths: paths, fallback: false }
}

export default function Page(props: Props) {
  const { batch, branch, semester, _result_original } = props

  if (!_result_original) return Custom404()

  let rollno_filter_pattern = new RegExp("")
  let sort_cmp = (a: SemesterStudent, b: SemesterStudent) => {
    return b.cgpa - a.cgpa
  }

  const refreshResult = () => {
    const _result = _result_original
    _result.students = _result_original.students.filter((student) => {
      return rollno_filter_pattern.test(student.rollno)
    })
    _result.students.sort(sort_cmp)
    setResult(_result)
  }

  const [result, setResult] = useState(_result_original)

  return (
    <div>
      <div>
        <h1>Batch {batch}</h1>
        <h1>Branch {branch}</h1>
        <h1>Semester {semester}</h1>
      </div>

      <div>
        <select
          onChange={(e) => {
            const pattern = new RegExp(e.target.value)
            rollno_filter_pattern = pattern
            refreshResult()
          }}
        ></select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            {result.subjects.map((subject) => (
              <th>{subject}</th>
            ))}
            <th>TC</th>
            <th>CGPA</th>
            <th>Failed Papers</th>
          </tr>
        </thead>
        <tbody>
          {result.students.map((student) => (
            <tr>
              <td>{student.rollno}</td>
              <td>{student.name}</td>
              {student.grades.map((grade) => (
                <td>{grade}</td>
              ))}
              <td>{student.tc}</td>
              <td>{student.cgpa}</td>
              <td>{student.failed_papers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
