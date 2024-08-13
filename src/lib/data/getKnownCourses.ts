import { query_result } from "../sql"

export async function getKnownCourses(): Promise<string[]> {
  const courses = (
    await query_result("select subject from subject_details order by subject;")
  ).map((x: any) => x["subject"])

  return courses
}
