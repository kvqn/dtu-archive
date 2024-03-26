// import { prisma } from "@/prisma"
import { query_result } from "./sql"

function round_to_two_places(num: number) {
  return Math.round(num * 100 + Number.EPSILON) / 100
}

export async function isValidBatch(batch: string): Promise<boolean> {
  const batches = await getBatches()
  return batches.includes(batch)
}

export async function getBatches(): Promise<string[]> {
  const result = await query_result(
    `select unique substring(rollno, 1, 4) as batch from result_student_details order by batch desc`
  )
  return result.map((row: any) => row["batch"])
}

export async function isValidBranch(
  batch: string,
  branch: string
): Promise<boolean> {
  const branches = await getBranches(batch)
  return branches?.includes(branch) ?? false
}

export async function getBranches(batch: string): Promise<string[] | null> {
  if (!(await isValidBatch(batch))) return null
  const result = await query_result(
    `
select unique regexp_substr(rollno, '(?<=\/)[a-zA-Z0-9]+') as branch
from
    (
        select ifnull(rollnos.new, t0.rollno) as rollno
        from (select rollno from result_student_details where substring(rollno, 1, 4) = '${batch}') as t0
        left join rollnos on rollnos.old = t0.rollno
    ) as t1
where rollno regexp '\/[A-Z]+\/'
order by branch asc
      `
  )
  return result.map((row: any) => row["branch"])
}

export async function isValidSemester(
  batch: string,
  branch: string,
  semester: string
): Promise<boolean> {
  const semesters = await getSemesters(batch, branch)
  return semesters?.includes(parseInt(semester)) ?? false
}

export async function getSemesters(
  batch: string,
  branch: string
): Promise<number[] | null> {
  if (!(await isValidBranch(batch, branch))) return null
  const result = await query_result(
    `
select distinct semester
from result_heirarchy
where
    result in (
        select distinct result
        from
            (
                select result, ifnull(rollnos.new, t0.rollno) as rollno
                from
                    (select result, rollno from result_student_details where substring(rollno, 1, 4) = '${batch}') as t0
                left join rollnos on rollnos.old = t0.rollno
            ) as t1
        where rollno regexp '\/${branch}\/'
    )
order by semester desc
      `
  )
  return result.map((row: any) => row["semester"])
}
