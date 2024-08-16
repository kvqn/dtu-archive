"use server"

import { prisma } from "@/prisma"

import { getUser } from "./getUser"

export async function getFullUser() {
  const user = await getUser()
  if (!user || !user.email) return null

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  })

  return existingUser
}
