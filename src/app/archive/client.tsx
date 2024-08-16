import { getFiles } from "@/server/actions/getFiles"
import type { getTags } from "@/server/actions/getTags"

export function ClientPage({
  tags,
  files,
}: {
  tags: Awaited<ReturnType<typeof getTags>>

  files: Awaited<ReturnType<typeof getFiles>>
}) {
  return (
    <div>
      <div>{JSON.stringify(tags)}</div>
      <div>{JSON.stringify(files)}</div>
    </div>
  )
}
