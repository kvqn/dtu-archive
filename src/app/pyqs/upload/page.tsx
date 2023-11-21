"use client"

import uploadPYQ from "@/server/uploadPyq"
import { signIn, signOut, useSession } from "next-auth/react"
import toast from "react-hot-toast"

export default function Page() {
  const { data: session } = useSession()

  async function upload(data: FormData) {
    const result = await uploadPYQ(data)
    if (result?.error) toast.error(result.error)
  }

  if (!session || !session.user) return <>You have to be logged in to do this</>

  return (
    <div>
      PYQs Upload
      <form action={upload}>
        <input type="file" name="file" />
        <input type="text" name="subject_code" placeholder="Subject Code" />
        <input type="text" name="subject_name" placeholder="Subject Name" />
        <input type="number" name="year" placeholder="Year" />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}
