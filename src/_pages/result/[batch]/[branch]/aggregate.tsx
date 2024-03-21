import AggregateResultTable from "@/components/AggregateResultTable/AggregateResultTable"
import Custom404 from "@/components/Custom404"
import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { getAggregateResult, getBatches, getBranches } from "@/lib/data"
import Head from "next/head"

type Props = {
  batch: string
  branch: string
  result: AggregateResult | null
}

export const getStaticProps = async ({ params }: any) => {
  const { batch, branch } = params
  const result = await getAggregateResult(batch, branch)
  return {
    props: {
      batch: batch,
      branch: branch,
      result: result,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = []
  const batches = await getBatches()
  for (const batch of batches) {
    const branches = await getBranches(batch)
    if (!branches) continue
    for (const branch of branches) {
      paths.push({ params: { batch: batch, branch: branch } })
    }
  }

  return { paths: paths, fallback: false }
}

export default function Page(props: Props) {
  const { batch, branch, result } = props

  if (!result) return Custom404()

  const title = `Aggregate ${branch} ${batch}`

  return (
    <>
      <Head>
        <title>{title}</title>
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
