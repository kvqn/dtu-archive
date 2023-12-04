"use server"

import { prisma } from "@/prisma"
import { Session } from "next-auth"

export async function getFile(id: number, session: Session | null) {
  let user
  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })
  }

  await prisma.fileViews.create({
    data: {
      fileId: id,
      userId: user?.id ? user.id : null,
    },
  })

  const file = await prisma.file.findUnique({
    where: {
      id: id,
    },
  })
  return JSON.parse(JSON.stringify(file))
}
