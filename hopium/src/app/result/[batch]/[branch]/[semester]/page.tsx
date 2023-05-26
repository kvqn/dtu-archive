import Custom404 from "@/components/Custom404"
import { getSemesterResult } from "@/lib/data"

type Props = {
    params: {
        batch: string
        branch: string
        semester: string
      }
  }


export default async function Page(props: Props) {

    const result = await getSemesterResult(props.params.batch, props.params.branch, props.params.semester)
    if (!result) return Custom404()

    return (
        <div>
          <div>
            <h1>Batch {props.params.batch}</h1>
            <h1>Branch {props.params.branch}</h1>
            <h1>Semester {props.params.semester}</h1>
          </div>

          <table>
            <thead>
              <tr>
                <th>Roll No.</th>
                <th>Name</th>
                {
                  result.subjects.map((subject) => ( <th>{subject}</th> ) )
                }
                <th>TC</th>
                <th>CGPA</th>
                <th>Failed Papers</th>
              </tr>
            </thead>
            <tbody>
              {
                result.students.map((student) => (
                  <tr>
                    <td>{student.rollno}</td>
                    <td>{student.name}</td>
                    { student.grades.map((grade) => ( <td>{grade}</td> ) ) }
                    <td>{student.tc}</td>
                    <td>{student.cgpa}</td>
                    <td>{student.failed_papers}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )

}
