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

  let name_filter_pattern = new RegExp("")
  let sort_cmp = (a: SemesterStudent, b: SemesterStudent) => {
    return b.cgpa - a.cgpa
  }

  const refreshResult = () => {
    const _result = structuredClone(_result_original)
    _result.students = _result.students.filter((student) => {
      return name_filter_pattern.test(student.name)
    })
    _result.students.sort(sort_cmp)
    setResult(_result)
    console.log("Refreshed Result")
  }

  const [result, setResult] = useState(_result_original)
  const [hiddenSubjects, setHiddenSubjects] = useState<string[]>([])

  return (
    <div>
      <div>
        <h1>Batch {batch}</h1>
        <h1>Branch {branch}</h1>
        <h1>Semester {semester}</h1>
      </div>

      <div>
        <label htmlFor="filter-input">Filter Names</label>
        <input id="filter-input" type="text" />
        <button
          onClick={() => {
            console.log("Filtering")
            const filter_input = document.getElementById(
              "filter-input"
            ) as HTMLInputElement
            const pattern = new RegExp(filter_input.value, "i")
            name_filter_pattern = pattern
            refreshResult()
          }}
        >
          Filter
        </button>
      </div>

      <div>
        <label>Subject Select</label>
        { result.subjects.map((subject) => (
              <div>
                <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setHiddenSubjects(hiddenSubjects.filter((s) => s !== subject))
                  } else {
                    setHiddenSubjects([...hiddenSubjects, subject])
                  }}
                }
                defaultChecked={true}
                /> {subject}
              </div>
        ))}
      </div>

      <div>
        <label htmlFor="sort-select">Sort By</label>
        <select
          id="sort-select"
          onChange={(e) => {
            const sort_by = e.target.value
            switch (sort_by) {
              case "cgpa-ascending":
                sort_cmp = (a: SemesterStudent, b: SemesterStudent) => { return b.cgpa - a.cgpa }
                break
              case "cgpa-descending":
                sort_cmp = (a: SemesterStudent, b: SemesterStudent) => { return a.cgpa - b.cgpa }
                break
              case "rollno-ascending":
                sort_cmp = (a: SemesterStudent, b: SemesterStudent) => { return a.rollno.localeCompare(b.rollno) }
                break
              case "rollno-ascending":
                sort_cmp = (a: SemesterStudent, b: SemesterStudent) => { return b.rollno.localeCompare(a.rollno) }
                break
              }
              refreshResult()
          }
          }
          >
          <option value="cgpa-ascending">CGPA (Ascending)</option>
          <option value="cgpa-descending">CGPA (Descending)</option>
          <option value="rollno-ascending">Roll No. (Ascending)</option>
          <option value="rollno-descending">Roll No. (Descending)</option>
          </select>


      </div>

      <table>
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            {
              result.subjects
                .filter((subject) => !hiddenSubjects.includes(subject))
                .map((subject) => ( <th>{subject}</th>))
            }
            <th>TC</th>
            <th>CGPA</th>
            <th>Failed Papers</th>
          </tr>
        </thead>
        <tbody>
          {result.students.map((student) => (
            <tr key={student.rollno}>
              <td>{student.rollno}</td>
              <td>{student.name}</td>
              {
                  student.grades
                    .filter((_, i) => !hiddenSubjects.includes(result.subjects[i]))
                    .map((grade) => ( <td>{grade}</td>))
              }
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
