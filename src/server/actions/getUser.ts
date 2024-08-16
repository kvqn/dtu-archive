"use server"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export async function getUser() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  return session.user ?? null
}
