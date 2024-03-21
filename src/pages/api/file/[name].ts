import { prisma } from "@/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const name = req.query.name
    if (!name) {
      res.status(400).json({ error: "name is required" })
      return
    }

    if (typeof name !== "string") {
      res.status(400).json({ error: "name must be a string" })
      return
    }

    const file = await prisma.file.findUnique({
      where: { name: name },
    })

    if (!file) return res.status(404).json({ error: "File not found" })
    const content_type = (() => {
      if (file.type === "PDF") return "application/pdf"
      if (file.type === "JPEG") return "image/jpeg"
    })()

    if (content_type) res.setHeader("Content-Type", content_type)
    const buffer = Buffer.from(file.blob)
    res.send(buffer)
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
