import { sql } from "@/lib/sql"

export async function getAllCourses(): Promise<string[]> {
  const courses = (
    await sql("select unique subject from result_grades order by subject;")
  ).map((x: any) => x.subject)

  return courses
}
