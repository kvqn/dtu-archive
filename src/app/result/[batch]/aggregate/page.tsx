import { AggregateResult } from "../_components/AggregateResult"

export default async function Page({ params }: { params: { batch: string } }) {
  const result = await AggregateResult({ batch: params.batch })
  return result
}
