import Custom404 from "@/components/Custom404"
import GradientLink from "@/components/GradientLink/GradientLink"
import { getBranches } from "@/server/getBranches"

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
      <div>
        <h1 className="mb-16 text-center text-5xl font-black">
          Select your branch
        </h1>
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
