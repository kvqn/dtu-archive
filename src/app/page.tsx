import { Card } from "@/components/Card"
import { Logo } from "@/components/Logo"
import { Navbar } from "@/components/Navbar/Navbar"
import { Metadata } from "next"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

// import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
  title: "DTU Archive",
}

export default function Page() {
  return (
    <div className="flex flex-grow flex-col">
      {/* <Navbar /> */}
      <div className="flex w-full flex-grow flex-col items-center justify-evenly">
        <div
          className={twMerge(
            "flex w-full flex-col items-center justify-center gap-20 text-center"
          )}
        >
          <div className="flex items-center justify-evenly">
            <Logo className="lg:h-[200px] lg:w-[200px]" />
            <div className="w-full justify-center text-center font-permanent-marker text-5xl lg:text-9xl">
              DTU ARCHIVE
            </div>
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
