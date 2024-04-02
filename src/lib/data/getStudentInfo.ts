import { prisma } from "@/prisma"

import { query_result } from "../sql"

type StudentInfo = {
  name: string
  old?: string
}
export async function getStudentInfo(rollno: string): Promise<StudentInfo> {
  const name = await prisma.result_student_details.findFirstOrThrow({
    select: {
      name: true,
    },
    where: {
      rollno: rollno,
    },
  })

  const old = await prisma.rollnos.findFirst({
    select: {
      old: true,
    },
    where: {
      new: rollno,
    },
  })

  return {
    name: name.name,
    old: old?.old,
  }
}
