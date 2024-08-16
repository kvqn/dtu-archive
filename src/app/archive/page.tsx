import { getFiles } from "@/server/actions/getFiles"
import { getTags } from "@/server/actions/getTags"

import { ClientPage } from "./client"

export default async function Page() {
  const tags = await getTags()
  const files = await getFiles()
  return <ClientPage tags={tags} files={files} />
}
