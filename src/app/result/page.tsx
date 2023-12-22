import GradientLink from "@/components/GradientLink/GradientLink"
import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { getBatches } from "@/server/getBatches"
import Head from "next/head"

export default async function Page() {
  const batches = await getBatches()

  return (
    <>
      <Head>
        <title>Result | Batch Selection</title>
      </Head>

      <Navbar
        left={[<NavbarItem name="Result" href="/result" key="result" />]}
      />

      <div className="m-20">
        <h1 className="heading-select">Select your batch</h1>
        {batches.map((batch) => (
          <GradientLink href={`/result/${batch}`} name={batch} key={batch} />
        ))}
      </div>
    </>
  )
}
