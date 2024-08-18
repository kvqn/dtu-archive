"use server"

import { prisma } from "@/prisma"

export async function deleteFile(fileId: number) {
  try {
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    })

    return { status: "success" as const }
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error" as const, error: error.message }
    }
    return { status: "error" as const, error: "Unknown error" }
  }
}
