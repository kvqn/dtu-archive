"use server"

import { prisma } from "@/prisma"

export async function createTag(name: string) {
  if (name.length === 0) {
    return {
      status: "error" as const,
      error: "Tag name cannot be empty",
    }
  }

  const existingTag = await prisma.tag.findUnique({
    where: {
      name: name,
    },
  })

  if (existingTag) {
    return {
      status: "error" as const,
      error: "Tag with that name already exists",
    }
  }

  const tag = await prisma.tag.create({
    data: {
      name: name,
    },
  })

  return {
    status: "success" as const,
    tag: tag,
  }
}
