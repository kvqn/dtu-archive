import { prisma } from "@/prisma"

import { getAllCourses } from "./_lib/actions/courses-get"
import EditCourses from "./client"

export default async function Page() {
  const courses = await prisma.subjectDetails.findMany({})
  const allCourses = await getAllCourses()

  return <EditCourses courses={courses} allCourses={allCourses} />
}
