"use server"

import { getSemesterResult as _getSemesterResult } from "@/lib/data"

export async function getSemesterResult(
  batch: string,
  branch: string,
  semester: string
) {
  return await _getSemesterResult(batch, branch, semester)
}
