"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

export default function LoggedInStatus() {
  const { data: session } = useSession()
  const [hover, setHover] = useState(false)

  if (!session || !session.user) {
    return <div onClick={() => signIn()}>Log In</div>
  }

  let image = session.user.image
  if (!image) image = ""

  return (
    <div
      className="flex h-10 w-32 items-center justify-center overflow-hidden rounded-xl border bg-blue-100 p-2 text-center dark:border-[#363b3d] dark:bg-[#1f272b]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!hover ? (
        <div className="flex items-center gap-2">
          <Image
            src={image}
            alt="provide_pic"
            width={30}
            height={30}
            className="rounded-xl"
          />
          <div className="font-inter text-base">{session.user.name}</div>
        </div>
      ) : (
        <div
          onClick={() => signOut()}
          className="h-full w-full cursor-pointer text-center"
        >
          Sign Out
        </div>
      )}
    </div>
  )
}
