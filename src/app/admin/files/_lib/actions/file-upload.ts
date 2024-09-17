"use server"

import { getFullUser } from "@/lib/actions/get-user"
import { prisma } from "@/prisma"
import { FileType } from "@prisma/client"

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File
  const user = await getFullUser()
  if (!user) {
    return {
      status: "error" as const,
      error: "User not found",
    }
  }

  let fileType: FileType
  if (file.type === "application/pdf") {
    fileType = FileType.PDF
  } else if (file.type === "image/jpeg") {
    fileType = FileType.JPEG
  } else {
    return {
      status: "error" as const,
      error: "File type not allowed",
    }
  }

  let fileName = file.name
  fileName = fileName.replace(/\.[^/.]+$/, "")
  let fileNameSuffixCount = 0

  function constructFileName() {
    const filename =
      fileName +
      (fileNameSuffixCount > 0 ? ` (${fileNameSuffixCount})` : "") +
      "." +
      fileType.toLowerCase()
    console.log("constructFileName", filename)
    return filename
  }
  while (true) {
    const existingFile = await prisma.file.findUnique({
      select: {
        id: true,
      },
      where: {
        name: constructFileName(),
      },
    })
    if (existingFile) {
      fileNameSuffixCount++
    } else {
      break
    }
  }

  try {
    const createdFile = await prisma.file.create({
      select: {
        id: true,
      },
      data: {
        name: constructFileName(),
        blob: Buffer.from(await file.arrayBuffer()),
        type: fileType,
        uploadedById: user.id,
      },
    })
    return {
      status: "success" as const,
      fileId: createdFile.id,
    }
  } catch {
    return {
      status: "error" as const,
      error: "Error while uploading file",
    }
  }
}
