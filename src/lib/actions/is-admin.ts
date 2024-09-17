"use server"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export async function isAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return false

  if (session.user.email === "guneetaggarwal@gmail.com") return true
  return false
}
