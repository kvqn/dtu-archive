"use server"

import prisma from "@/prisma"
import { Session } from "next-auth"

export async function heartFile(fileId: number, session: Session) {
  if (!session.user?.email) return false
  if (!fileId) return false

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) return false

  const isAlreadyHearted = await prisma.fileHearts.findUnique({
    where: {
      userId_fileId: {
        fileId: fileId,
        userId: user.id,
      },
    },
  })

  if (isAlreadyHearted) {
    await prisma.fileHearts.delete({
      where: {
        userId_fileId: {
          fileId: fileId,
          userId: user.id,
        },
      },
    })
    return true
  }

  try {
    await prisma.fileHearts.create({
      data: {
        userId: user.id,
        fileId: fileId,
      },
    })
  } catch (e) {
    return false
  }

  return true
}
