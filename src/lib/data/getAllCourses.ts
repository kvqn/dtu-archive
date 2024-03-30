import { prisma } from "@/prisma"

import { query_result } from "../sql"

export async function getAllCourses(): Promise<string[]> {
  const courses = (
    await query_result(
      "select unique subject from result_grades order by subject;"
    )
  ).map((x: any) => x["subject"])

  return courses
}
