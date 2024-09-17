import { sql } from "@/lib/sql"

export async function getSemesters(
  batch: string,
  branch: string
): Promise<number[]> {
  const result = await sql(
    `
    select 
      distinct semester 
    from 
      result_heirarchy 
    where 
      result in (
        select 
          distinct result 
        from 
          (
            select 
              result, 
              ifnull(rollnos.new, t0.rollno) as rollno 
            from 
              (
                select 
                  result, 
                  rollno 
                from 
                  result_student_details 
                where 
                  substring(rollno, 1, 4) = '${batch}'
              ) as t0 
              left join rollnos on rollnos.old = t0.rollno
          ) as t1 
        where 
          rollno regexp '\/${branch}\/'
      ) 
    order by 
      semester desc
    `
  )
  return result.map((row: any) => row.semester)
}
