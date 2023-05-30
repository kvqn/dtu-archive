import { getBatches } from "@/lib/data"
import Link from "next/link";

export const getStaticProps = async () => {
  const batches = await getBatches();
  return {
    props: {
      batches: batches
    }
  }
}

type Props = {
  batches: string[]
}

export default function Page({ batches } : Props) {
  return (
    <div>
      <h1>Result</h1>
      <h2>Batches</h2>
      <ul>
        {
          batches.map((batch) => (
            <li key='{batch}'>
              <Link href={`/result/${batch}`}>Batch {batch}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
