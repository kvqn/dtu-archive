import { getFiles } from "@/server/actions/getFiles"
import { getTags } from "@/server/actions/getTags"

import { ClientPage } from "./client"

export default async function Page() {
  const files = await getFiles()
  const tags = await getTags()
  return <ClientPage tags={tags} />
}
