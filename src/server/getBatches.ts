"use server"

import { query_result } from "@/lib/sql"

export async function getBatches(): Promise<string[]> {
  const result = await query_result(
    `
  select 
    unique substring(rollno, 1, 4) as batch 
  from 
    result_student_details 
  order by 
    batch desc
    `
  )
  return result.map((row: any) => row["batch"])
}
