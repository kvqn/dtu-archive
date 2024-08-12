"use client"

import { Button } from "@/components/ui/button"
import type { Student } from "@/lib/data/getAllStudents"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { Suspense, useState } from "react"

function rollBreakdown(rollno: string): {
  batch: string
  branch: string
  roll: number
} {
  const match = rollno.match(/(2K\d+)\/([A-Z0-9]+)\/(\d+)/)
  if (!match) throw new Error("Invalid rollno")

  return {
    batch: match[1],
    branch: match[2],
    roll: parseInt(match[3]),
  }
}

function rollnoToUrl(rollno: string) {
  const { batch, branch, roll } = rollBreakdown(rollno)
  return `/student/${batch}-${branch}-${roll}`
}

export function SearchStudent({ students }: { students: Student[] }) {
  let filter = ""
  const [filteredStudents, setFilteredStudents] = useState<typeof students>([])

  function submit() {
    if (filter === "") return setFilteredStudents([])
    setFilteredStudents(
      students.filter(
        (student) =>
          student.name.toLowerCase().includes(filter.toLowerCase()) ||
          student.old.toLowerCase().includes(filter.toLowerCase()) ||
          student.new?.toLowerCase().includes(filter.toLowerCase())
      )
    )
  }

  return (
    <div className="flex w-[80%] flex-col items-center gap-4">
      <div className="flex w-full items-center gap-2 rounded-md border p-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} height={"1rem"} />
        <input
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="w-full text-xl outline-none dark:bg-black"
          onChange={(e) => (filter = e.target.value)}
        />
        <Button onClick={submit}>Search</Button>
      </div>
      <div className="flex w-full flex-col gap-4">
        {filteredStudents.map((student) => (
          <Link
            href={rollnoToUrl(student.new ?? student.old)}
            key={student.old}
            className="font-geist flex h-[80px] items-center divide-x overflow-hidden rounded-md border shadow-lg transition-all hover:scale-105"
          >
            <div className="whitespace-preline flex h-full flex-grow items-center bg-neutral-100 p-2 px-4 font-medium dark:bg-neutral-900">
              {student.name}
            </div>
            <div className="300 flex h-full min-w-[40%] flex-col items-center justify-center whitespace-nowrap bg-neutral-50 p-2 font-geist-mono dark:bg-neutral-950">
              <p>{student.new}</p>
              <p>{student.old}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
