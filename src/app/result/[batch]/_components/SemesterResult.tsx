import getSemesterResult from "@/app/result/_lib/server/get-semester-grades"

import { SemesterResultCards } from "./SemesterResultCards"

export async function SemesterResult({
  batch,
  branch,
  semester,
}: {
  batch: string
  branch: string
  semester: number
}) {
  const result = await getSemesterResult(batch, branch, semester)

  return (
    <div>
      <div className="mt-16 text-center font-geologica text-2xl font-bold">
        Result
      </div>
      <div className="pb-6 text-center font-geologica text-xl font-bold">{`${batch} ${branch} - ${semester}th Sem`}</div>
      <SemesterResultCards result={result} />
    </div>
  )
}
