import Custom404 from "@/components/Custom404"
import GradientLink from "@/components/GradientLink/GradientLink"
import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { getBranches } from "@/server/getBranches"
import Head from "next/head"

export default async function Page({
  params,
}: {
  params: {
    batch: string
  }
}) {
  const batch = params.batch
  const branches = await getBranches(params.batch)

  if (!branches) return Custom404()

  return (
    <>
      <Head>
        <title>Batch of {batch}</title>
      </Head>

      <Navbar
        left={[
          <NavbarItem name="Result" href="/result" key="result" />,
          <NavbarItem name={batch} href={`/result/${batch}`} key="batch" />,
        ]}
      />

      <div>
        <h1 className="heading-select">Select your branch</h1>
        <div className="grid grid-cols-3">
          {branches.map((branch) => (
            <GradientLink
              name={branch}
              href={`/result/${batch}/${branch}`}
              key={branch}
              className="h-32"
            />
          ))}
        </div>
      </div>
    </>
  )
}
