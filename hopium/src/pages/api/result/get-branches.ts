import { getBranches } from "@/lib/data"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = string[] | null

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      const { branch } = req.query
      const branches = await getBranches(branch as string)
      return res.status(200).json(branches)

    default:
      return res.status(400)
  }
}
