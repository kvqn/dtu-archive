import Custom404 from "@/components/Custom404"
import { getAggregateResult } from "@/lib/data"

type Props = {
    params: {
        batch: string
        branch: string
      }
  }

function ineedhelp(n_semesters: number) {
  let semesters: string[] = []
  for (let i = 1; i <= n_semesters; i++)
    semesters.push(`Sem ${i}`)
  return semesters
  }


export default async function Page(props: Props) {

    const result = await getAggregateResult(props.params.batch, props.params.branch)
    if (!result) return Custom404()

    return (
      <div>
        <div>
          <h1>Batch {props.params.batch}</h1>
          <h1>Branch {props.params.branch}</h1>
          <h1>Aggregate Result</h1>
        </div>

        <table>
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Name</th>
              {
                ineedhelp(result.n_semesters).map((semester) => ( <th>{semester}</th> ) )
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
                  { student.cgpas.map((cgpa) => ( <td>{cgpa}</td> ) ) }
                  <td>{student.aggregate}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
}
