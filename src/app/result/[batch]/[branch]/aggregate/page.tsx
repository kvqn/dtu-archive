import { AggregateResult } from "../../_components/AggregateResult"

export default async function Page({
  params,
}: {
  params: { batch: string; branch: string }
}) {
  const result = await AggregateResult({
    batch: params.batch,
    branch: params.branch,
  })
  return result
}
