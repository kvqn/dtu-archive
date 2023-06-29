import Custom404 from "@/components/Custom404"
import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import SemesterResultTable from "@/components/SemesterResultTable/SemesterResultTable"
import {
  getBatches,
  getBranches,
  getSemesterResult,
  getSemesters
} from "@/lib/data"

type Props = {
  batch: string
  branch: string
  semester: string
  result: SemesterResult
}

export const getStaticProps = async ({ params }: any) => {
  const { batch, branch, semester } = params
  const result = await getSemesterResult(batch, branch, semester)
  return {
    props: {
      batch: batch,
      branch: branch,
      semester: semester,
      result: result
    }
  }
}

export const getStaticPaths = async () => {
  const paths = []
  const batches = await getBatches()
  for (const batch of batches) {
    const branches = await getBranches(batch)
    if (!branches) continue
    for (const branch of branches) {
      const semesters = await getSemesters(batch, branch)
      if (!semesters) continue
      for (const sem of semesters) {
        paths.push({
          params: { batch: batch, branch: branch, semester: sem.toString() }
        })
      }
    }
  }

  return { paths: paths, fallback: false }
}

export default function Page(props: Props) {
  const { batch, branch, semester, result } = props

  if (!result) return Custom404()

  return (
    <>
      <Navbar
        center={<NavbarItem name="Result" href="/result" />}
        right={
          <>
            <NavbarItem name={batch} href={`/result/${batch}`} />
            <NavbarItem name={branch} href={`/result/${batch}/${branch}`} />
            <NavbarItem
              name={"Sem " + semester}
              href={`/result/${batch}/${branch}/${semester}`}
            />
          </>
        }
      />
      <SemesterResultTable result={result} />
    </>
  )
}
