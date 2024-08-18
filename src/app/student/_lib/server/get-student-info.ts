import { sql } from "@/lib/sql"

type StudentInfo = {
  name: string
  old?: string
}
export async function getStudentInfo(rollno: string): Promise<StudentInfo> {
  const _name = (
    await sql(
      `select name from result_student_details where rollno = '${rollno}' limit 1`
    )
  ).map((row: any) => row["name"])

  if (_name.length == 0) {
    throw new Error("Invalid rollno")
  }

  const name: string = _name[0]

  const _old = (
    await sql(`select old from rollnos where new = '${rollno}' limit 1`)
  ).map((row: any) => row["old"])

  let old: string | undefined = undefined

  if (_old.length > 0) {
    old = _old[0]
  }

  return {
    name: name,
    old: old,
  }
}
