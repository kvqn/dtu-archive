"use server"

import prisma from "@/prisma"

export async function getFile(id: number) {
  const file = await prisma.file.findUnique({
    where: {
      id: id
    }
  })
  console.log(file)
  return JSON.parse(JSON.stringify(file))
}
