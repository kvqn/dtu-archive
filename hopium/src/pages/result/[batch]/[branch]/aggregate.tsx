import Custom404 from "@/components/Custom404"
import Navbar from "@/components/Navbar"
import { getAggregateResult, getBatches, getBranches } from "@/lib/data"

type Props = {
        batch: string
        branch: string
        result: AggregateResult | null
  }

function ineedhelp(n_semesters: number) {
  let semesters: string[] = []
  for (let i = 1; i <= n_semesters; i++)
    semesters.push(`Sem ${i}`)
  return semesters
}


export const getStaticProps = async ({ params }: any) => {
  const { batch, branch } = params
  const result = await getAggregateResult(batch, branch)
  return {
    props: {
        batch: batch,
        branch: branch,
        result: result
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
      paths.push({ params: { batch: batch, branch: branch } })
    }
  }

  return { paths: paths, fallback: false }
}

export default function Page(props: Props) {

    const { batch, branch, result } = props

    if (!result) return Custom404()

    return (
        <>
        <Navbar batch={batch} branch={branch} semester={'AGGREGATE'} />
        <div>
        <div>
        <h1>Batch {batch}</h1>
        <h1>Branch {branch}</h1>
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
        <th>CGPA</th>
        </tr>
        </thead>
        <tbody>
        {
          result.students.map((student) => (
                <tr>
                <td>{student.rollno}</td>
                <td>{student.name}</td>
                { student.cgpas.map((cgpa) => ( <td>{cgpa}</td> ) ) }
                <td>{student.aggregate.toFixed(3)}</td>
                </tr>
                ))
        }
    </tbody>
      </table>
      </div>
      </>
    )
}
