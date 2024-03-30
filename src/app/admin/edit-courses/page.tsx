import { getAllCourses } from "@/lib/data/getAllCourses"
import { prisma } from "@/prisma"

import EditCourses from "./client"

export default async function Page() {
  const courses = await prisma.subject_details.findMany({})
  const allCourses = await getAllCourses()

  return <EditCourses courses={courses} allCourses={allCourses} />
}
