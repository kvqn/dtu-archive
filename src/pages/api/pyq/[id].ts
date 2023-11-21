import prisma from "@/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { useRouter } from "next/router"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const id = req.query.id
    if (!id) {
      res.status(400).json({ error: "id is required" })
      return
    }

    // @ts-ignore
    const fileId = parseInt(id)
    if (isNaN(fileId))
      return res.status(400).json({ error: "id must be a number" })

    const pyq = await prisma.pyq.findUnique({
      where: { fileId: fileId },
      include: { file: true }
    })
    if (!pyq) return res.status(404).json({ error: "pyq not found" })
    const buffer = Buffer.from(pyq.file.blob)
    res.setHeader("Content-Type", "application/pdf")
    // res.setHeader("Content-Length", buffer.length)
    const type = (() => {
      if (pyq.type === "MID_TERM_QUESTIONS") return "MTE"
      if (pyq.type === "END_TERM_QUESTIONS") return "ETE"
      if (pyq.type === "END_TERM_ANSWERS") return "ETE ANS"
      if (pyq.type === "MID_TERM_ANSWERS") return "MTE ANS"
    })()
    const fileName = `${pyq.subject_code}_${type}_${pyq.year}.pdf`
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`)
    res.send(buffer)
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
