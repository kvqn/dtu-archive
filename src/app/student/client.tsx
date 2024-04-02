"use client"

import type { Student } from "@/lib/data/getAllStudents"
import { rollBreakdown } from "@/lib/utils"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"

function rollnoToUrl(rollno: string) {
  const { batch, branch, roll } = rollBreakdown(rollno)
  return `/student/${batch}-${branch}-${roll}`
}

export function SearchStudent({ students }: { students: Student[] }) {
  const [filter, setFilter] = useState("")
  const [filteredStudents, setFilteredStudents] = useState<typeof students>([])
  useEffect(() => {
    if (filter === "") return setFilteredStudents([])
    setFilteredStudents(
      students.filter(
        (student) =>
          student.name.toLowerCase().includes(filter.toLowerCase()) ||
          student.old.toLowerCase().includes(filter.toLowerCase()) ||
          student.new?.toLowerCase().includes(filter.toLowerCase())
      )
    )
  }, [filter, students])
  return (
    <div className="flex w-[80%] flex-col items-center gap-4">
      <div className="flex w-full items-center gap-2 rounded-md border border-black bg-white p-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          className="font-geist text-xl outline-none"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        {filteredStudents.map((student) => (
          <Link
            href={rollnoToUrl(student.new ?? student.old)}
            key={student.old}
            className="flex h-[80px] items-center divide-x divide-black overflow-hidden rounded-md border border-black bg-white font-geist shadow-lg"
          >
            <div className="whitespace-preline flex h-full flex-grow items-center bg-emerald-100 p-2 px-4 font-medium">
              {student.name}
            </div>
            <div className="flex h-full min-w-[40%] flex-col items-center justify-center whitespace-nowrap bg-emerald-300 p-2 font-geist-mono">
              <p>{student.new}</p>
              <p>{student.old}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
