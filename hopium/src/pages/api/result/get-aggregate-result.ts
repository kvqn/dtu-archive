import { getAggregateResult } from "@/lib/data"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = AggregateResult | null

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      const { batch, branch } = req.query
      const result = await getAggregateResult(batch as string, branch as string)
      res.status(200).json(result)

    default:
      res.status(400)
  }
}
