"use client"

import { BottomSearchBar } from "@/components/BottomSearchBar"
import { RoundedSection } from "@/components/RoundedSection"
import { cn } from "@/lib/utils"
import { saveCourse } from "@/server/actions/saveCourse"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { Prisma } from "@prisma/client"
import * as Dialog from "@radix-ui/react-dialog"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

export default function EditCourses({
  courses,
  allCourses,
}: {
  courses: Prisma.subject_detailsGetPayload<{}>[]
  allCourses: string[]
}) {
  const [knownCourses, setKnownCourses] = useState<
    {
      code: string
      name: string
      credits: number
    }[]
  >(courses)

  const [unknownCourses, setUnknownCourses] = useState<string[]>(
    allCourses.filter((course) => !courses.find((c) => c.code === course))
  )

  const [collapsedKnown, setCollapsedKnown] = useState<boolean>(false)
  const [collapsedUnknown, setCollapsedUnknown] = useState<boolean>(false)

  const [filter, setFilter] = useState("")

  useEffect(() => {
    setKnownCourses(
      courses
        .filter(
          (course) =>
            course.code.toLowerCase().includes(filter.toLowerCase()) ||
            course.name.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => a.code.localeCompare(b.code))
    )

    setUnknownCourses(
      allCourses
        .filter(
          (course) =>
            course.toLowerCase().includes(filter.toLowerCase()) &&
            !courses.find((c) => c.code === course)
        )
        .sort()
    )
  }, [filter, courses, allCourses])

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="font-geologica text-3xl">Edit Courses</div>

      <div className="flex w-[90%] flex-col items-center rounded-xl border-2 border-red-600 bg-red-100 py-2">
        <div
          className="cursor-pointer font-geist text-sm font-bold uppercase text-red-700"
          onClick={() => {
            setCollapsedKnown(!collapsedKnown)
          }}
        >
          {collapsedKnown ? "collapsed" : "collapse"}
        </div>
        <div className="font-geologica font-bold uppercase text-red-700">
          Known Courses
        </div>
        {!collapsedKnown && (
          <div
            className={cn(
              "transition-transition-all flex w-[90%] flex-col gap-4 overflow-hidden py-2"
            )}
          >
            {knownCourses.length === 0 ? (
              <div className="w-full text-center">No Results</div>
            ) : (
              knownCourses.map((course) => (
                <Course
                  key={course.code}
                  name={course.name}
                  credits={course.credits}
                  code={course.code}
                  color="red"
                />
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex w-[90%] flex-col items-center rounded-xl border-2 border-blue-600 bg-blue-100 py-2">
        <div
          className="cursor-pointer font-geist text-sm font-bold uppercase text-blue-700"
          onClick={() => {
            setCollapsedUnknown(!collapsedUnknown)
          }}
        >
          {collapsedUnknown ? "collapsed" : "collapse"}
        </div>
        <div className="font-geologica font-bold text-blue-700">
          UNKNOWN COURSES
        </div>
        {!collapsedUnknown && (
          <div className="flex w-[90%] flex-col gap-4 py-2">
            {unknownCourses.length === 0 ? (
              <div className="w-full text-center">No Results</div>
            ) : (
              unknownCourses.map((course) => (
                <Course key={course} code={course} color="blue" />
              ))
            )}
          </div>
        )}
      </div>

      <BottomSearchBar
        onChange={(e) => {
          setFilter(e.target.value)
        }}
      />
    </div>
  )
}

function Course({
  code,
  name,
  credits,
  color,
}: {
  code: string
  name?: string | null | undefined
  credits?: number | undefined
  color: "red" | "blue" | "green"
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-1 rounded-lg border p-4 font-geist",
        {
          "border-blue-400 bg-blue-200": color === "blue",
          "border-red-400 bg-red-200": color === "red",
          "border-green-400 bg-green-200": color === "green",
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div className="font-bold">{code}</div>
        <EditCourse code={code} name={name} credits={credits} />
      </div>
      <div className="flex items-end justify-between">
        <div className="flex max-w-[60%] divide-x divide-black overflow-hidden rounded-sm border border-black text-sm">
          <div className="flex-grow bg-yellow-100 px-2 py-1">Name</div>
          <div className="bg-white px-2 py-1 text-center">{name ?? "??"}</div>
        </div>
        <div className="flex h-fit divide-x divide-black overflow-hidden rounded-sm border border-black text-sm">
          <div className="flex-grow bg-yellow-100 px-2 py-1">Credits</div>
          <div className="bg-white px-2 py-1 text-center">
            {credits ?? "??"}
          </div>
        </div>
      </div>
    </div>
  )
}

function EditCourse({
  code,
  name,
  credits,
}: {
  code: string
  name?: string | null
  credits?: number | null
}) {
  const [courseName, setCourseName] = useState<string>(name ?? "")
  const [selectedCredits, setCredits] = useState<number>(credits ?? 4)

  const dialogCloseButtonRef = useRef<HTMLDivElement>(null)
  function closeDialog() {
    dialogCloseButtonRef.current?.click()
  }

  async function SaveAction() {
    if (courseName === "") {
      toast.error("Please fill all the fields")
      return
    }

    closeDialog()

    const resp = await saveCourse({
      code,
      name: courseName,
      credits: selectedCredits,
    })

    if (resp === "error") {
      toast.error("Error Updating Course")
      return
    }

    toast.success("Course Updated")
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2 data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]">
          <div className="flex flex-col gap-4 rounded-xl border border-black bg-white p-8 outline-none">
            <h2 className="w-full text-center font-geist text-2xl font-bold">
              {code}
            </h2>
            <RoundedSection
              title="Course Name"
              classNameContainer="bg-stone-100 pt-6 pb-4 border-stone-300"
              classNameTitle="border border-stone-300"
            >
              <input
                className="h-10 w-full rounded-md border border-gray-400 px-2 font-geist outline-none"
                defaultValue={name ?? ""}
                placeholder="Course Name"
                onChange={(e) => {
                  setCourseName(e.target.value)
                }}
              />
            </RoundedSection>
            <RoundedSection
              title="Credits"
              classNameContainer="bg-stone-100 pt-6 pb-4"
              classNameTitle="border"
            >
              <div className="flex w-full items-center justify-evenly">
                <div
                  className={cn(
                    "cursor-pointer rounded-md border border-blue-600 bg-blue-200 px-4 py-2",
                    {
                      "scale-105 border-2 bg-blue-300 shadow-sm":
                        selectedCredits === 2,
                    }
                  )}
                  onClick={() => setCredits(2)}
                >
                  2
                </div>
                <div
                  className={cn(
                    "cursor-pointer rounded-md border border-blue-600 bg-blue-200 px-4 py-2",
                    {
                      "scale-105 border-2 bg-blue-300 shadow-sm":
                        selectedCredits === 3,
                    }
                  )}
                  onClick={() => setCredits(3)}
                >
                  3
                </div>
                <div
                  className={cn(
                    "cursor-pointer rounded-md border border-blue-600 bg-blue-200 px-4 py-2",
                    {
                      "scale-105 border-2 bg-blue-300 shadow-sm":
                        selectedCredits === 4,
                    }
                  )}
                  onClick={() => setCredits(4)}
                >
                  4
                </div>
              </div>
            </RoundedSection>
            <div className="flex w-full justify-around">
              <div
                className="w-[40%] cursor-pointer select-none rounded-lg border border-green-600 bg-green-200 px-4 py-2 text-center font-bold"
                onClick={SaveAction}
              >
                Save
              </div>
              <Dialog.Close className="w-[40%]">
                <div
                  className="cursor-pointer select-none rounded-lg border border-red-600 bg-red-200 px-4 py-2 text-center font-bold"
                  ref={dialogCloseButtonRef}
                >
                  Cancel
                </div>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
