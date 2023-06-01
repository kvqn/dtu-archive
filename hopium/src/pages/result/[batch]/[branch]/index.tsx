import Custom404 from "@/components/Custom404"
import GradientLink from "@/components/GradientLink/GradientLink"
import Navbar from "@/components/Navbar"
import { getBatches, getBranches, getSemesters } from "@/lib/data"

type Props = {
  batch: string
  branch: string
  semesters: number
}

export const getStaticProps = async ({ params }: any) => {
  const batch = params.batch as string
  const branch = params.branch as string
  const semesters = await getSemesters(batch, branch)
  return {
    props: {
      batch: batch,
      branch: branch,
      semesters: semesters
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
      paths.push({ params: { batch: batch, branch: branch } })
    }
  }

  return { paths: paths, fallback: false }
}

export default function Page(props: Props) {
  const { batch, branch, semesters } = props

  if (!semesters) return Custom404()

  return (
    <>
      <Navbar batch={batch} branch={branch} />

      <div>
        <h1 className="heading-select">Select semester</h1>
        <GradientLink href={`/result/${batch}/${branch}/aggregate`} name="Aggregate" />
        <ul>
          {[...Array(semesters)].map((_, index) => (
            <li>
              <GradientLink href={`/result/${batch}/${branch}/${index + 1}`} name={`Sem ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
