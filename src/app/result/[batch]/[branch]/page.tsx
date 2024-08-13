import Custom404 from "@/components/Custom404"
import GradientLink from "@/components/GradientLink/GradientLink"
import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { getSemesters } from "@/server/getSemesters"
import Head from "next/head"

export default async function Page({
  params,
}: {
  params: { batch: string; branch: string }
}) {
  const batch = params.batch
  const branch = params.branch
  const semesters = await getSemesters(batch, branch)

  if (!semesters) return Custom404()

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
