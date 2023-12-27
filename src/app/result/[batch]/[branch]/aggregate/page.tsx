import Custom404 from "@/components/Custom404"
import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { getAggregateResult } from "@/server/getAggregateResult"
import Head from "next/head"

import AggregateResultTable from "./AggregateResultTable"

export default async function Page({
  params,
}: {
  params: { batch: string; branch: string }
}) {
  const batch = params.batch
  const branch = params.branch

  const result = await getAggregateResult(batch, branch)

  if (!result) return Custom404()

  return (
    <>
      <Head>
        <title>Aggregate Result</title>
      </Head>
      <Navbar
        left={[
          <NavbarItem name="Result" href="/result" key="result" />,
          <NavbarItem name={batch} href={`/result/${batch}`} key="batch" />,
          <NavbarItem
            name={branch}
            href={`/result/${batch}/${branch}`}
            key="branch"
          />,
          <NavbarItem
            name="Aggregate"
            href={`/result/${batch}/${branch}/aggregate`}
            key="aggregate"
          />,
        ]}
      />

      <div className="mx-40 mt-4 flex w-auto space-x-20 font-inter text-2xl font-extrabold">
        <span className="grow text-center">
          Average : {result.average_cgpa}
        </span>
        <span className="grow text-center">Median : {result.median_cgpa}</span>
      </div>

      <AggregateResultTable result={result} />
    </>
  )
}
