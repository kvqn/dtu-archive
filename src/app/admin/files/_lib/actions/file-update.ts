"use server"

import { prisma } from "@/prisma"

export async function updateFile(id: number, name: string, tags: number[]) {
  try {
    await prisma.fileTags.deleteMany({
      where: {
        fileId: id,
      },
    })

    await prisma.file.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    })

    await prisma.fileTags.createMany({
      data: tags.map((tag) => ({
        fileId: id,
        tagId: tag,
      })),
    })

    return { status: "success" as const }
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error" as const, error: error.message }
    }
    return { status: "error" as const, error: "Unknown error" }
  }
}
