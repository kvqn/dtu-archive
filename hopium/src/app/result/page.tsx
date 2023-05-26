import { getBatches } from "@/lib/data"
import Link from "next/link";


export default async function Page() {
  const batches = await getBatches();
  return (
    <div>
      <h1>Result</h1>
      <h2>Batches</h2>
      <ul>
        {
          batches.map((batch) => (
            <li>
              <Link href={`/result/${batch}`}>Batch {batch}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
