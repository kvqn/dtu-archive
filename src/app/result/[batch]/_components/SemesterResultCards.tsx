"use client"

import { SemesterResult } from "@/app/result/_lib/server/get-semester-grades"
import { BottomSearchBar } from "@/components/BottomSearchBar"
import { useState } from "react"

export function SemesterResultCards({ result }: { result: SemesterResult }) {
  let filter = ""
  const [filteredStudents, setFilteredStudents] = useState(result.students)

  const sortOptions = new Map([
    ["Rank", "rank"],
    ["Roll no", "rollno"],
  ])

  const [selectedSortOption, setSelectedSortOption] = useState("rank")

  function submitAction() {
    setFilteredStudents(
      result.students
        .filter(
          (student) =>
            student.name.toLowerCase().includes(filter.toLowerCase()) ||
            student.rollno.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => {
          if (selectedSortOption === "rank") {
            return a.rank - b.rank
          } else {
            const numA = parseInt(a.rollno.match(/\d+$/)![0])
            const numB = parseInt(b.rollno.match(/\d+$/)![0])
            return numA - numB
          }
        })
    )
  }

  return (
    <div className="flex w-full justify-center font-geist">
      <div className="flex w-[90%] max-w-[600px] flex-col items-center gap-4">
        {filteredStudents.map((student, index) => (
          <div
            key={index}
            className="flex w-full flex-col divide-y divide-black overflow-hidden rounded-xl border border-black shadow-lg"
          >
            <div className="flex divide-x divide-black font-bold">
              <div className="bg-emerald-300 p-2 dark:bg-emerald-900">
                {student.rank}
              </div>
              <div className="flex-grow bg-emerald-500 p-2 dark:bg-emerald-950">
                {student.name}
              </div>
              <div className="bg-emerald-300 p-2 dark:bg-emerald-900">
                {student.rollno}
              </div>
            </div>
            <div className="grid grid-cols-2 place-content-center gap-1 bg-emerald-50 p-2 text-sm dark:bg-neutral-900">
              {student.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex divide-x divide-black overflow-hidden rounded-lg border border-black"
                >
                  <div className="flex-grow bg-white px-2 dark:bg-neutral-800">
                    {subject.code}
                  </div>
                  <div className="w-[20%] bg-emerald-200 px-2 dark:bg-emerald-900">
                    {subject.grade}
                  </div>
                  <div className="w-[15%] bg-white px-2 dark:bg-neutral-800">
                    {subject.credits}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-black bg-yellow-100 dark:bg-emerald-950">
              <div className="p-2">Total Credits: {student.totalCredits}</div>
              <div className="p-2">CGPA: {student.cgpa.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <BottomSearchBar
        onChange={(e) => (filter = e.target.value)}
        sortOptions={sortOptions}
        selectedSortOption={selectedSortOption}
        setSelectedSortOption={setSelectedSortOption}
        onSubmit={submitAction}
      />
    </div>
  )
}
