import { isValidBatch } from '@/lib/data'
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = boolean


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {

    case 'GET':
      const { batch } = req.query
      const is_valid = await isValidBatch(batch as string)
      return res.status(200).json(is_valid)

    default:
      return res.status(400)

  }
}
