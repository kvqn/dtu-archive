import { getAggregateResult } from "../../_lib/server/get-aggregate-grades"
import { AggregateResultCards } from "./AggregateResultCards"

export async function AggregateResult({
  batch,
  branch,
}: {
  batch: string
  branch?: string
}) {
  const result = await getAggregateResult(batch, branch ?? ".*")
  return (
    <>
      <div className="mt-16 text-center font-geologica text-2xl font-bold">
        Result
      </div>
      <div className="pb-6 text-center font-geologica text-xl font-bold">{`${batch} ${
        branch ? branch + " " : ""
      }- Aggregate`}</div>
      <AggregateResultCards result={result} />
    </>
  )
}
