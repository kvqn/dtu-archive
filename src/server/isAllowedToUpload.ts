"use server"

import prisma from "@/prisma"
import { Session } from "next-auth"

export async function isAllowedToUpload(session: Session | null) {
  if (!session || !session.user || !session.user.email) return false
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })
  if (!user) return false
  if (user.email === "guneetaggarwal@gmail.com") return true
  return false
}
