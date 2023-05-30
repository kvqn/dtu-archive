import Custom404 from "@/components/Custom404"
import { getBranches, getBatches} from "@/lib/data"
import Link from "next/link"

type Props = {
  branches: string[]
  batch : string
}

export const getStaticProps = async ({ params }: any) => {
  const batch = params.batch as string
  const branches = await getBranches(batch)
  return { props: { branches: branches, batch: batch } }
}

export const getStaticPaths = async () => {
  const batches = await getBatches()
  const paths = batches.map((batch) => ({ params: { batch: batch } }))
  return { paths: paths, fallback: false }
}

export default function Page(props : Props) {

  const batch = props.batch
  const branches = props.branches

  if (!branches) return Custom404()

  return (
    <div>
      <h1>Batch {batch}</h1>

      <h2>Branches</h2>
      <ul>
        {
          branches.map((branch) => (
            <li key='{branch}'>
              <Link href={`/result/${batch}/${branch}`}>Branch {branch}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

