"use server"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { prisma } from "@/prisma"
import { getServerSession } from "next-auth"

export async function getUser() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  return session.user ?? null
}

export async function getFullUser() {
  const user = await getUser()
  if (!user?.email) return null

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  })

  return existingUser
}
