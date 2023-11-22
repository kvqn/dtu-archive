"use client"

import { isAllowedToUpload } from "@/server/isAllowedToUpload"
import uploadPYQ from "@/server/uploadPyq"
import { signIn, signOut, useSession } from "next-auth/react"
import toast from "react-hot-toast"

export default async function Page() {
  const { data: session } = useSession()

  if (!(await isAllowedToUpload(session)))
    return <>You are not allowed to do this.</>

  async function upload(data: FormData) {
    data.append("user_email", session?.user?.email || "")
    const result = await uploadPYQ(data)
    if (result?.error) toast.error(result.error)
  }

  return (
    <div>
      PYQs Upload
      <form action={upload}>
        <input type="file" name="file" />
        <input type="text" name="subject_code" placeholder="Subject Code" />
        <input type="text" name="subject_name" placeholder="Subject Name" />
        <input type="number" name="year" placeholder="Year" />
        <select name="type">
          <option value="MID_TERM_QUESTIONS">Mid Term Questions</option>
          <option value="END_TERM_QUESTIONS">End Term Questions</option>
          <option value="MID_TERM_ANSWERS">Mid Term Answers</option>
          <option value="END_TERM_ANSWERS">End Term Answers</option>
        </select>
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}
