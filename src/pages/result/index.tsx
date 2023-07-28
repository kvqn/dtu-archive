import GradientLink from "@/components/GradientLink/GradientLink"
import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { getBatches } from "@/lib/data"
import Head from "next/head"

export const getStaticProps = async () => {
  const batches = await getBatches()
  batches.splice(batches.indexOf("2K22"), 1)
  return { props: { batches: batches } }
}

type Props = {
  batches: string[]
}

export default function Page({ batches }: Props) {
  return (
    <>
      <Head>
        <title>Result | Batch Selection</title>
      </Head>

      <Navbar left={[<NavbarItem name="Result" href="/result" active={true} key="result" />]} />

      <div className="m-20">
        <h1 className="heading-select">Select your batch</h1>
        {batches.map((batch) => (
          <GradientLink href={`/result/${batch}`} name={batch} key={batch} />
        ))}
      </div>
    </>
  )
}
