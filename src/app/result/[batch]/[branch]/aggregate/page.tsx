export default async function Page({
  params,
}: {
  params: { batch: string; branch: string }
}) {
  const batch = params.batch
  const branch = params.branch
  return <>aggregate result</>
}
