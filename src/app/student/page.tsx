import { getAllStudents } from "@/lib/data/getAllStudents"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { SearchStudent } from "./client"

export default async function Page() {
  const students = await getAllStudents()
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <p className="font-geist text-xl font-bold">
        View individual student records
      </p>
      <SearchStudent students={students} />
    </div>
  )
}
