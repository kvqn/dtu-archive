import { getAllStudents } from "./_lib/server/get-students"
import { SearchStudent } from "./client"

export default async function Page() {
  const students = await getAllStudents()
  return (
    <div className="flex w-full flex-col items-center gap-6 pt-16">
      <p className="font-geist text-xl font-bold">
        View individual student records
      </p>
      <SearchStudent students={students} />
    </div>
  )
}
