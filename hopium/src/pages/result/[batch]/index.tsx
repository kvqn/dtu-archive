import Custom404 from "@/components/Custom404"
import GradientLink from "@/components/GradientLink/GradientLink"
import Navbar from "@/components/Navbar"
import { getBatches, getBranches } from "@/lib/data"

type Props = {
  branches: string[]
  batch: string
}

export const getStaticProps = async ({ params }: any) => {
  const batch = params.batch as string
  const branches = await getBranches(batch)
  return { props: { branches: branches, batch: batch } }
}

export const getStaticPaths = async () => {
  const batches = await getBatches()
  const paths = batches.map((batch) => ({ params: { batch: batch } }))
  return { paths: paths, fallback: false }
}

export default function Page(props: Props) {
  const batch = props.batch
  const branches = props.branches

  if (!branches) return Custom404()

  return (
    <>
      <Navbar batch={ batch }/>

      <div>

        <h1 className="heading-select">Select your branch</h1>
        <div className="grid grid-cols-3">
        {branches.map((branch) => (
              <GradientLink href={`/result/${batch}/${branch}`} name={branch} />
              ))}
        </div>
      </div>
    </>
  )
}
