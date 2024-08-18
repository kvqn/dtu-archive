"use server"

import { prisma } from "@/prisma"

export async function getTags() {
  return await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
  })
}
