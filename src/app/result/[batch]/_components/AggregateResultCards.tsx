"use client"

import { BottomSearchBar } from "@/components/BottomSearchBar"
import { AggregateResult } from "@/lib/data/getAggregateGrades"
import { useState } from "react"

export function AggregateResultCards({ result }: { result: AggregateResult }) {
  let filter = ""
  const [filteredStudents, setFilteredStudents] = useState(result.students)

  const sortOptions = new Map([
    ["Rank", "rank"],
    ["Roll no", "rollno"],
  ])

  const [selectedSortOption, setSelectedSortOption] = useState("rank")

  function updateFilteredStudents() {
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
              <div className="bg-emerald-300 p-2 dark:bg-teal-950">
                {student.rank}
              </div>
              <div className="flex-grow bg-emerald-500 p-2 dark:bg-emerald-950">
                {student.name}
              </div>
              <div className="bg-emerald-300 p-2 dark:bg-teal-950">
                {student.rollno}
              </div>
            </div>
            <div className="grid grid-cols-2 place-content-center gap-1 bg-emerald-50 p-2 text-sm dark:bg-emerald-950">
              {student.semesters.map((semester, index) => (
                <div
                  key={index}
                  className="flex divide-x divide-black overflow-hidden rounded-lg border border-black text-xs"
                >
                  <div className="w-[30%] bg-white px-2 dark:bg-neutral-900">
                    Sem {semester.semester}
                  </div>
                  <div className="w-[25%] bg-emerald-200 px-2 text-center font-geist-mono dark:bg-emerald-800">
                    {semester.cgpa.toFixed(2)}
                  </div>
                  <div className="flex flex-grow items-center justify-end bg-white px-2 dark:bg-neutral-900">
                    {semester.credits} credits
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-black bg-yellow-100 dark:bg-teal-950">
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
        onSubmit={updateFilteredStudents}
      />
    </div>
  )
}
