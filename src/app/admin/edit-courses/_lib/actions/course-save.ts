"use server"

import { prisma } from "@/prisma"
import { revalidatePath } from "next/cache"

export async function saveCourse({
  code,
  name,
  credits,
}: {
  code: string
  name: string
  credits: number
}): Promise<"success" | "error"> {
  await prisma.subjectDetails.upsert({
    where: { code },
    update: { name, credits },
    create: { code, name, credits },
  })

  revalidatePath("/admin/edit-courses")
  return "success"
}
