import Custom404 from "@/components/Custom404"
import { getBatches, getBranches, getSemesters } from "@/lib/data"
import Link from "next/link"

type Props = {
  batch: string
  branch: string
  semesters: number
}

export const getStaticProps = async ({ params }: any) => {
  const batch = params.batch as string
  const branch = params.branch as string
  const semesters = await getSemesters(batch, branch)
  return {
    props: {
      batch: batch,
      branch: branch,
      semesters: semesters
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
  const { batch, branch, semesters } = props

  if (!semesters) return Custom404()

  return (
    <div>
      <h1>Batch {batch}</h1>
      <h1>Branch {branch}</h1>
      <h1>Aggregate</h1>
      <Link href={`/result/${batch}/${branch}/aggregate`}>Aggregate</Link>
      <h1>Semesters</h1>
      <ul>
        {[...Array(semesters)].map((_, index) => (
          <li>
            <Link href={`/result/${batch}/${branch}/${index + 1}`}>
              Sem {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
