import { getStudentGrades } from "@/lib/data/getStudentGrades"
import { getStudentInfo } from "@/lib/data/getStudentInfo"
import { gradeValue } from "@/lib/utils"
import { prisma } from "@/prisma"

async function getValidRollno(rollno: string): Promise<string | null> {
  const match = rollno.match(/^(2K\d{2})-([A-Z\d]+)-([0-9]+)$/)
  if (!match) return null
  const batch = match[1]
  const branch = match[2]
  const roll = match[3]
  const found = await prisma.result_grades.findFirst({
    where: {
      rollno: `${batch}/${branch}/${roll}`,
    },
    select: {
      rollno: true,
    },
  })

  if (!found) return null

  return found.rollno
}

export default async function Page({
  params,
}: {
  params: {
    rollno: string
  }
}) {
  const validRollno = await getValidRollno(params.rollno)
  if (!validRollno) {
    return <p>Invalid rollno</p>
  }

  const grades = await getStudentGrades(validRollno)
  const { name, old } = await getStudentInfo(validRollno)

  return (
    <div className="flex w-full flex-col items-center pb-20">
      <div className="flex w-[90%] flex-col items-center gap-4">
        <h2 className="mt-16 text-center text-3xl font-bold">{name}</h2>
        <div className="grid w-full grid-cols-2 justify-evenly">
          <div className="flex flex-col items-center gap-2">
            <p className="font-geologica text-xl font-semibold uppercase">
              Old Roll No
            </p>
            <p>{old ?? "---"}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="font-geologica text-xl font-semibold uppercase">
              New Roll No
            </p>
            <p>{validRollno}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="font-geologica text-xl font-semibold">
              Total Credits
            </p>
            <p>{grades.reduce((acc, grade) => acc + grade.credits, 0)}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="font-geologica text-xl font-semibold">
              Aggregate CGPA
            </p>
            <p>
              {(
                grades.reduce(
                  (a, b) => a + b.credits * gradeValue(b.grade),
                  0
                ) / grades.reduce((a, b) => a + b.credits, 0)
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-6">
          {Array.from(new Set(grades.map((grade) => grade.semester))).map(
            (semester) => (
              <div
                key={semester}
                className="divide-y-black w-fulldivide-y divide-y-2 divide-black overflow-hidden rounded-xl border-2 border-black bg-emerald-100 shadow-lg dark:bg-emerald-950"
              >
                <div className="p-2 text-center font-geologica text-xl dark:bg-teal-950">
                  Semester {semester}
                </div>
                <div className="flex flex-col items-center gap-2 py-2">
                  {grades
                    .filter((grade) => grade.semester === semester)
                    .map((grade) => (
                      <div
                        key={grade.subject_code}
                        className="flex w-[90%] divide-x-2 divide-black overflow-hidden rounded-md border-2 border-black font-geist text-sm"
                      >
                        <div className="w-[25%] bg-teal-200 py-1 text-center font-medium dark:bg-emerald-900">
                          {grade.subject_code}
                        </div>
                        <div className="flex-grow bg-white p-1 text-center dark:bg-neutral-900">
                          {grade.subject_name ?? "-- Unknown --"}
                        </div>
                        <div className="w-[10%] bg-yellow-50 p-1 text-center dark:bg-neutral-800">
                          {grade.credits}
                        </div>
                        <div className="w-[12%] bg-emerald-300 p-1 px-2 text-left font-medium dark:bg-emerald-900">
                          {grade.grade}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex w-full divide-x-2 divide-black bg-amber-100 font-geist dark:bg-teal-950">
                  <div className="w-1/2 px-4 py-2">
                    {`Total Credits: ${grades
                      .filter((grade) => grade.semester === semester)
                      .reduce((a, b) => a + b.credits, 0)
                      .toFixed(2)}`}
                  </div>
                  <div className="w-1/2 px-4 py-2 text-right">
                    {`CGPA: ${(
                      grades
                        .filter((grade) => grade.semester === semester)
                        .reduce(
                          (a, b) => a + b.credits * gradeValue(b.grade),
                          0
                        ) /
                      grades
                        .filter((grade) => grade.semester === semester)
                        .reduce((a, b) => a + b.credits, 0)
                    ).toFixed(2)}`}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
