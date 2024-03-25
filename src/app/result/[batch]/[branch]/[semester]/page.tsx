import { SemesterResult } from "@/components/SemesterResult"
import getSemesterResult from "@/lib/data/getSemesterGrades"

export default async function Page({
  params,
}: {
  params: { batch: string; branch: string; semester: string }
}) {
  // TODO: check params

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <SemesterResult
        batch={params.batch}
        branch={params.branch}
        semester={parseInt(params.semester)}
      />
    </>
  )
}
