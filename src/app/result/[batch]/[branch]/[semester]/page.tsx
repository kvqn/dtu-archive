import Custom404 from "@/components/Custom404"
import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { getSemesterResult } from "@/server/getSemesterResult"
import Head from "next/head"

import SemesterResultTable from "./SemesterResultTable"

export default async function Page({
  params,
}: {
  params: { batch: string; branch: string; semester: string }
}) {
  const batch = params.batch
  const branch = params.branch
  const semester = params.semester
  const result = await getSemesterResult(batch, branch, semester)

  if (!result) return Custom404()

  return (
    <>
      <Head>
        <title>Semester Result</title>
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
            name={"Sem " + semester}
            href={`/result/${batch}/${branch}/${semester}`}
            key="semester"
          />,
        ]}
      />

      <SemesterResultTable result={result} />
    </>
  )
}
