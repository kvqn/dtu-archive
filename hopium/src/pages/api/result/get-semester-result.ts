import { getSemesterResult } from "@/lib/data"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = SemesterResult | null

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      const { batch, branch, semester } = req.query
      const result = await getSemesterResult(batch as string, branch as string, semester as string)
      res.status(200).json(result)

    default:
      res.status(400).end()
  }
}
