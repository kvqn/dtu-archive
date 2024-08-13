import { AggregateResult } from "@/components/AggregateResult"

export default function Page({ params }: { params: { batch: string } }) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AggregateResult batch={params.batch} />
    </>
  )
}
