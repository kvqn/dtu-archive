import Custom404 from "@/components/Custom404"
import { getBranches } from "@/lib/data"
import Link from "next/link"

type Props = {
  params: {
    batch: string
    }
}

export default async function Page(props : Props) {

  const batch = props.params.batch as string

  const branches = await getBranches(batch)
  if (!branches) return Custom404()

  return (
    <div>
      <h1>Batch {props.params.batch}</h1>

      <h2>Branches</h2>
      <ul>
        {
          branches.map((branch) => (
            <li>
              <Link href={`/result/${batch}/${branch}`}>Branch {branch}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

