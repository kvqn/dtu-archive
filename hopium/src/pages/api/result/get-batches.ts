import { getBatches } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = string[] | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const batches = await getBatches();
      return res.status(200).json(batches);

    default:
      return res.status(400);
  }
}
