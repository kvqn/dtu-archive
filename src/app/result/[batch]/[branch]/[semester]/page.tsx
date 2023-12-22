export default async function Page({
  params,
}: {
  params: { batch: string; branch: string; semester: string }
}) {
  const batch = params.batch
  const branch = params.branch
  const semester = params.semester
  return <>result of sem {semester}</>
}
