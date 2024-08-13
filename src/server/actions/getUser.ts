"use server"

import { getServerSession } from "next-auth"

export async function getUser() {
  const session = await getServerSession()
  if (!session) return null

  return session.user ?? null
}
