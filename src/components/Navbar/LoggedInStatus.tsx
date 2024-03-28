import { useServerSession } from "@/lib/server_utils"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

export default function LoggedInStatus() {
  const { data: session } = useSession()

  const loggedIn = session && session.user ? true : false
  return (
    <div
      className="cursor-pointer rounded-lg border bg-slate-200 px-4 py-1 font-geist font-semibold transition-colors hover:border-zinc-500 hover:bg-slate-300"
      onClick={() => {
        if (loggedIn) signOut()
        else signIn()
      }}
    >
      {loggedIn ? "Sign Out" : "Log In"}
    </div>
  )
}
