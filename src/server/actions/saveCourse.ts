"use server"

import { prisma } from "@/prisma"

export async function saveCourse({
  code,
  name,
  credits,
}: {
  code: string
  name: string
  credits: number
}): Promise<"success" | "error"> {
  await prisma.subject_details.upsert({
    where: { code },
    update: { name, credits },
    create: { code, name, credits },
  })

  return "success"
}
