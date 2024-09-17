"use server"

import { sql } from "@/lib/sql"

export async function getBranches(batch: string): Promise<string[]> {
  const result = await sql(
    `
    select 
      unique regexp_substr(rollno, '(?<=\/)[a-zA-Z0-9]+') as branch 
    from 
      (
        select 
          ifnull(rollnos.new, t0.rollno) as rollno 
        from 
          (
            select 
              rollno 
            from 
              result_student_details 
            where 
              substring(rollno, 1, 4) = '${batch}'
          ) as t0 
          left join rollnos on rollnos.old = t0.rollno
      ) as t1 
    where 
      rollno regexp '\/[A-Z]+\/' 
    order by 
      branch asc
    `
  )
  return result.map((row: any) => row.branch)
}
