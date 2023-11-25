"use client"

import { Navbar } from "@/components/Navbar/Navbar"
import Link from "next/link"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

// import { GeistMono } from 'geist/font/mono';

export default function Page() {
  return (
    <>
      <div className="flex h-screen flex-col">
        {/* <Navbar /> */}
        <div className="flex flex-grow flex-col justify-evenly">
          <div
            className={twMerge(
              "flex w-full flex-col items-center justify-center gap-20 text-center"
            )}
          >
            <div
              className="w-full justify-center text-center font-permanent-marker"
              style={{
                fontSize: "7rem",
              }}
            >
              DTU ARCHIVE
            </div>
            <div className="mx-[10%] font-geist text-5xl font-extrabold">
              A collection of much needed resources for DTU students.
            </div>
          </div>
          <div className="flex justify-evenly p-4">
            <Card
              title="Archive"
              description="A collection of past MTE and ETE papers"
              href="/pyqs"
            />
            <Card
              title="Results"
              description="View results published by your university in style"
              href="/under-construction"
            />
            <Card
              title="Courses"
              description="This helps a lot during course registration"
              href="/under-construction"
            />
          </div>
        </div>
      </div>
    </>
  )
}

function Card({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  const [hover, setHover] = useState(false)
  return (
    <Link
      href={href}
      className="flex h-36 w-[25%] flex-col items-center justify-center rounded-xl border p-4"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="p-2 font-geist text-xl font-bold">{title}</div>
      <div
        className={twMerge(
          "text-center font-geist font-normal transition-all",
          hover ? "h-14" : "h-0 opacity-0"
        )}
      >
        {description}
      </div>
    </Link>
  )
}
