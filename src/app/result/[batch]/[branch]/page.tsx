import NotFound from "@/app/not-found"
import { getSemesters } from "@/app/result/_lib/server/get-semesters"
import GradientLink from "@/components/GradientLink/GradientLink"

export default async function Page({
  params,
}: {
  params: { batch: string; branch: string }
}) {
  const batch = params.batch
  const branch = params.branch
  const semesters = await getSemesters(batch, branch)

  if (semesters.length == 0) return NotFound()

  const title = `${branch} ${batch}`

  return (
    <>
      <div>
        <h1 className="my-16 text-center text-5xl font-black">
          Select Semester
        </h1>
        <GradientLink
          href={`/result/${batch}/${branch}/aggregate`}
          name="Aggregate"
        />
        <ul>
          {semesters.map((semester) => (
            <GradientLink
              href={`/result/${batch}/${branch}/${semester}`}
              name={`Sem ${semester}`}
              key={semester}
            />
          ))}
        </ul>
      </div>
    </>
  )
}
