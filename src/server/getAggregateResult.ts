"use server"

import { getAggregateResult as _getAggregateResult } from "@/lib/data"

export async function getAggregateResult(batch: string, branch: string) {
  return await _getAggregateResult(batch, branch)
}
