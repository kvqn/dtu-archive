import { getAggregateResult } from "@/lib/data/getAggregateGrades"

import { AggregateResultCards } from "./AggregateResultCards"
import { Navbar } from "./Navbar/Navbar"

export async function AggregateResult({
  batch,
  branch,
}: {
  batch: string
  branch: string
}) {
  const result = await getAggregateResult(batch, branch)
  // const result: AggregateResult = {
  //   students: [
  //     {
  //       rollno: "123",
  //       name: "abc",
  //       cgpa: 9.0,
  //       semesters: [
  //         {
  //           semester: 1,
  //           subjects: [
  //             {
  //               subject: "AP101",
  //               grade: "A",
  //               credits: 4
  //             }
  //           ],
  //           cgpa: 9.0,
  //           credits: 27
  //         }
  //       ],
  //       totalCredits: 12,
  //       rank: 1
  //     }
  //   ]
  // }

  return (
    <>
      <div className="mt-16 text-center font-geologica text-2xl font-bold">
        Result
      </div>
      <div className="pb-6 text-center font-geologica text-xl font-bold">{`${batch} ${branch} - Aggregate`}</div>
      <AggregateResultCards result={result} />
    </>
  )
}
