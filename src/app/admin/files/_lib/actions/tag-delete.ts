"use server"

import { prisma } from "@/prisma"

export async function deleteTag(id: number) {
  await prisma.tag.delete({
    where: {
      id: id,
    },
  })
  return {
    status: "success" as const,
  }
}
