import { useServerSession } from "@/lib/server_utils"
import { isAllowedToUpload } from "@/server/isAllowedToUpload"
import uploadPYQ from "@/server/uploadPyq"
import { Metadata } from "next"
import toast from "react-hot-toast"

import Form from "./form"

export const metadata: Metadata = {
  title: "Upload PYQ",
}

export default async function Page() {
  // const { data:session } = useSession()
  const session = await useServerSession()

  if (!(await isAllowedToUpload(session)))
    return <>You are not allowed to do this.</>

  return <Form />
}
