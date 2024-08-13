import { SemesterResult } from "@/components/SemesterResult"
import { getBatches, getBranches, getSemesters } from "@/lib/data"

export async function generateStaticParams() {
  const paths = []
  const batches = await getBatches()
  for (const batch of batches) {
    const branches = await getBranches(batch)
    if (!branches) continue
    for (const branch of branches) {
      const semesters = await getSemesters(batch, branch)
      if (!semesters) continue
      for (const sem of semesters) {
        paths.push({ batch: batch, branch: branch, semester: sem.toString() })
      }
    }
  }

  return paths
}

export default async function Page({
  params,
}: {
  params: { batch: string; branch: string; semester: string }
}) {
  // TODO: check params
  const result = await SemesterResult({
    batch: params.batch,
    branch: params.branch,
    semester: parseInt(params.semester),
  })
  return result
}
