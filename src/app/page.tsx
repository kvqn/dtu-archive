"use client"

import { Card } from "@/components/Card"
import { Logo } from "@/components/Logo"
import LoggedInStatus from "@/components/Navbar/LoggedInStatus"
import { cn } from "@/lib/utils"
import { isAdmin } from "@/server/actions/isAdmin"
import Link from "next/link"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

// import { GeistMono } from 'geist/font/mono';

export default function Page() {
  const [clickedTitle, setClickedTitle] = useState(0)
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    async function _() {
      const checkAdmin = await isAdmin()
      if (checkAdmin) {
        setAdmin(true)
      }
    }
    void _()
  }, [])

  return (
    <div className="flex flex-grow flex-col">
      {/* <Navbar /> */}
      <div className="flex w-full flex-grow flex-col items-center justify-evenly">
        <div
          className={twMerge(
            "flex w-full flex-col items-center justify-center gap-4 text-center lg:gap-20"
          )}
        >
          <div className="flex items-center justify-evenly">
            <Logo className="lg:h-[200px] lg:w-[200px]" />
            <div
              className="w-full select-none justify-center text-center font-permanent-marker text-5xl lg:text-9xl"
              onClick={() => {
                setClickedTitle(clickedTitle + 1)
              }}
            >
              DTU ARCHIVE
            </div>
          </div>
          <div className="pb-2">
            {admin ? (
              <div className="pattern-dots-sm cursor-pointer rounded-xl border border-red-800 bg-red-100 p-4 text-gray-300 transition-colors hover:bg-red-200">
                <Link
                  className="h-full w-full font-geist font-bold text-black"
                  href="/admin"
                >
                  Admin Console
                </Link>
              </div>
            ) : (
              <div
                className={cn(
                  "transition-opacity",
                  clickedTitle >= 5 ? "opacity-100" : "opacity-0"
                )}
              >
                <LoggedInStatus />
              </div>
            )}
          </div>
          <div className="mx-[10%] font-geist text-3xl font-extrabold md:text-5xl">
            A collection of much needed resources for DTU students.
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-evenly gap-4 py-10 md:flex-row">
          <div className="flex gap-4">
            <Card
              title="Archive"
              description="A collection of past MTE and ETE papers"
              href="/pyqs"
            />
            <Card
              title="Notices"
              description="Notices scraped from DTU's website. All in one place."
              href="/notices"
            />
          </div>
          <div className="flex gap-4">
            <Card
              title="Results"
              description="View results published by your university in style"
              href="/result"
            />
            <Card
              title="Courses"
              description="This helps a lot during course registration"
              href="/courses"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
