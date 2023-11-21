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

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )

  if (session.status === "authenticated")
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
