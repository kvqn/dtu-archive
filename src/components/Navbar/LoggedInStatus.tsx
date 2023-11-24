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
      className="border rounded-xl p-2 bg-blue-100 w-32 overflow-hidden flex text-center items-center justify-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!hover ? (
        <div className="flex gap-2 items-center">
          <Image src={image} alt="provide_pic" width={30} height={30} />
          <div className="font-inter text-base">{session.user.name}</div>
        </div>
      ) : (
        <div
          onClick={() => signOut()}
          className="cursor-pointer text-center w-full"
        >
          Sign Out
        </div>
      )}
    </div>
  )
}
