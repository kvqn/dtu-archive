import getSemesterResult, {
  type SemesterResult as SemesterResultType,
} from "@/lib/data/getSemesterGrades"

import { Navbar } from "./Navbar/Navbar"
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
  console.log(result)

  return (
    <div>
      <Navbar />
      <div className="font-geologica text-center text-2xl font-bold">
        Result
      </div>
      <div className="font-geologica pb-6 text-center text-xl font-bold">{`${batch} ${branch} - ${semester}th Sem`}</div>
      {/* {JSON.stringify(result)} */}
      <SemesterResultCards result={result} />
    </div>
  )
}
