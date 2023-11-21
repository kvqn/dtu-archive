"use server"

import prisma from "@/prisma"
import { getServerSession } from "next-auth"

export default async function uploadPYQ(data: FormData) {
  const user_email = data.get("user_email") as string
  if (!user_email) return { error: "Invalid user" }
  if (user_email != "guneetaggarwal@gmail.com") return { error: "You are not authorized to upload PYQs." }

  const file: File | null = data.get("file") as File
  if (file.size === 0) return { error: "You must provide a PDF file." }

  const subject_code: string | null = data.get("subject_code") as string
  if (!subject_code) return { error: "You must provide a subject code." }

  const subject_name: string | null = data.get("subject_name") as string
  if (!subject_name) return { error: "You must provide a subject name." }

  let year: string | number | null = data.get("year") as string | number
  if (!year) return { error: "You must provide a year." }
  if (typeof year === "string") year = parseInt(year)
  if (isNaN(year)) return { error: "You must provide a valid year." }
  if (year < 2000 || year > 2100) return { error: "You must provide a valid year." }

  console.log(file)
}
