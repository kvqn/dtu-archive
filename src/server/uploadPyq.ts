"use server"

import { prisma } from "@/prisma"
import { randomUUID } from "crypto"
import { getServerSession } from "next-auth"

export default async function uploadPYQ(data: FormData) {
  const user_email = data.get("user_email") as string
  if (!user_email) return { error: "Invalid user" }
  if (user_email != "guneetaggarwal@gmail.com")
    return { error: "You are not authorized to upload PYQs." }

  const user = await prisma.user.findUnique({
    where: {
      email: user_email,
    },
  })
  if (!user) return { error: "Invalid user" }

  const file: File | null = data.get("file") as File
  if (!(file instanceof File) || file.size === 0)
    return { error: "You must provide a PYQ file." }

  const file_extension = file.name.split(".").pop()?.toUpperCase()
  if (
    !file_extension ||
    !(file_extension === "PDF" || file_extension === "JPEG")
  )
    return {
      error: `Invalid file extension. Allowed extensions are PDF, JPEG.`,
    }

  const subject_code: string | null = data.get("subject_code") as string
  if (!subject_code) return { error: "You must provide a subject code." }

  const subject_name: string | null = data.get("subject_name") as string
  if (!subject_name) return { error: "You must provide a subject name." }

  let year: string | number | null = data.get("year") as string | number
  if (!year) return { error: "You must provide a year." }
  if (typeof year === "string") year = parseInt(year)
  if (isNaN(year)) return { error: "You must provide a valid year." }
  if (year < 2000 || year > 2100)
    return { error: "You must provide a valid year." }

  const type = data.get("type") as string
  if (
    type !== "MID_TERM_QUESTIONS" &&
    type !== "END_TERM_QUESTIONS" &&
    type !== "MID_TERM_ANSWERS" &&
    type !== "END_TERM_ANSWERS" &&
    type !== "SUPPLEMENTARY_QUESTIONS"
  )
    return { error: "You must provide a valid type." }

  // check if same file exists

  // const existingPyq = await prisma.pyq.findFirst({
  //   where: {
  //     year: year,
  //     type: type,
  //     subject_code: subject_code,
  //   },
  // })

  // if (existingPyq) {
  //   return {
  //     error: `A PYQ with same year, type and subject already exists.`,
  //   }
  // }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const createdFile = await prisma.file.create({
    data: {
      type: file_extension,
      blob: buffer,
      name: randomUUID(),
    },
  })

  const createdPYQ = await prisma.pyq.create({
    data: {
      fileId: createdFile.id,
      subject_code,
      subject_name,
      year,
      type,
      uploadedBy_id: user.id,
    },
  })

  let type_name: string = ""
  if (type === "MID_TERM_QUESTIONS") type_name = "MID"
  if (type === "END_TERM_QUESTIONS") type_name = "END"
  if (type === "SUPPLEMENTARY_QUESTIONS") type_name = "SUPP"
  if (type === "MID_TERM_ANSWERS") type_name = "MID-ANS"
  if (type === "END_TERM_ANSWERS") type_name = "END-ANS"

  const lowercase_file_extension = file_extension.toLowerCase()

  const file_name = `${subject_code}_${type_name}_${year}_FILE-${createdFile.id}.${lowercase_file_extension}`

  await prisma.file.update({
    where: {
      id: createdFile.id,
    },
    data: {
      name: file_name,
    },
    select: {
      id: true,
    },
  })

  return {
    pyq: createdPYQ,
  }
}
