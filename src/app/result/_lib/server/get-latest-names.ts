import { sql } from "@/lib/sql"

export async function getLatestNamesFromBranch(
  batch: string,
  branch: string
): Promise<{ rollno: string; name: string }[]> {
  const resp: { rollno: string; name: string }[] = (
    await sql(`
with 
LATEST_ROLLNOS as (
select
	result,
	ifnull(rollnos.new, rollno) as latest_rollno,
	name
from
	result_student_details
left join rollnos on
	rollnos.old = rollno
),
CORRECT_BATCH as (
select
	*
from
	LATEST_ROLLNOS
where
	latest_rollno rlike '${batch}/${branch}/.*'
),
MAX_HEIRARCHY as (
select
	max(heirarchy) as max_heirarchy,
	latest_rollno
from
	CORRECT_BATCH
natural join result_heirarchy
group by
	latest_rollno
),
RESULT_NAME as (
select
	result,
	latest_rollno
from
	MAX_HEIRARCHY mh
left join result_heirarchy rh on
	mh.max_heirarchy = rh.heirarchy
),
LATEST_NAMES as (
select
	*
from
	RESULT_NAME
natural join CORRECT_BATCH
)
select
	latest_rollno,
	name
from
	LATEST_NAMES;
`)
  ).map((x: any) => ({ rollno: x.latest_rollno, name: x.name }))

  return resp
}
