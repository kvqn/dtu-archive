import GradientLink from "@/components/GradientLink/GradientLink"
import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { getBatches } from "@/server/getBatches"

export default async function Page() {
  const batches = await getBatches()

  return (
    <>
      <div className="m-20">
        <h1 className="mb-16 text-center text-5xl font-black">
          Select your batch
        </h1>
        {batches.map((batch) => (
          <GradientLink href={`/result/${batch}`} name={batch} key={batch} />
        ))}
      </div>
    </>
  )
}
