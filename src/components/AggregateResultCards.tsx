"use client"

import { AggregateResult } from "@/lib/data/getAggregateGrades"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

import { SortButton } from "./SortButton"

export function AggregateResultCards({ result }: { result: AggregateResult }) {
  const [filter, setFilter] = useState("")
  const [filteredStudents, setFilteredStudents] = useState(result.students)

  const sortOptions = new Map([
    ["Rank", "rank"],
    ["Roll no", "rollno"],
  ])

  const [selectedSortOption, setSelectedSortOption] = useState("rank")

  useEffect(() => {
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
  }, [filter, selectedSortOption, result.students])

  return (
    <div className="flex w-full justify-center font-geist">
      <div className="flex w-[90%] flex-col items-center gap-4">
        {filteredStudents.map((student, index) => (
          <div
            key={index}
            className="flex w-full flex-col divide-y divide-black overflow-hidden rounded-xl border border-black shadow-lg"
          >
            <div className="flex divide-x divide-black font-bold">
              <div className="bg-emerald-300 p-2">{student.rank}</div>
              <div className="flex-grow bg-emerald-500 p-2">{student.name}</div>
              <div className="bg-emerald-300 p-2">{student.rollno}</div>
            </div>
            <div className="grid grid-cols-2 place-content-center gap-1 bg-emerald-50 p-2 text-sm">
              {student.semesters.map((semester, index) => (
                <div
                  key={index}
                  className="flex divide-x divide-black overflow-hidden rounded-lg border border-black text-xs"
                >
                  <div className="w-[30%] bg-white px-2">
                    Sem {semester.semester}
                  </div>
                  <div className="w-[25%] bg-emerald-200 px-2 font-geist-mono">
                    {semester.cgpa.toFixed(2)}
                  </div>
                  <div className="flex flex-grow items-center bg-white px-2">
                    {semester.credits} credits
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-black bg-yellow-100">
              <div className="p-2">Total Credits: {student.totalCredits}</div>
              <div className="p-2">CGPA: {student.cgpa.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-10 flex h-10 w-[95%] items-center gap-2 rounded-lg border-2 border-black bg-white p-2 text-lg shadow-lg">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black" />
        <input
          className="flex-grow font-geist outline-none"
          placeholder="Filter ..."
          onChange={(e) => {
            setFilter(e.target.value)
          }}
        />
        <SortButton
          options={sortOptions}
          selectedOption={selectedSortOption}
          setSelectedOption={setSelectedSortOption}
        />
      </div>
    </div>
  )
}
