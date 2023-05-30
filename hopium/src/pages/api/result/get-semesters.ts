import { getBatches, getSemesters } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = number | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const { batch, branch } = req.query;
      const semesters = await getSemesters(batch as string, branch as string);
      return res.status(200).json(semesters);

    default:
      return res.status(400);
  }
}
