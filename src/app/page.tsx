import { Card } from "@/components/Card"
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
    <>
      <div className="flex h-screen flex-col">
        {/* <Navbar /> */}
        <div className="flex w-full flex-grow flex-col items-center justify-evenly">
          <div
            className={twMerge(
              "flex w-full flex-col items-center justify-center gap-20 text-center"
            )}
          >
            <div
              className="w-full justify-center text-center font-permanent-marker text-5xl md:text-9xl"
              // style={{
              //   fontSize: "7rem",
              // }}
            >
              DTU ARCHIVE
            </div>
            <div className="mx-[10%] font-geist text-3xl font-extrabold md:text-5xl">
              A collection of much needed resources for DTU students.
            </div>
          </div>
          <div className="flex flex-col items-center justify-evenly md:flex-row">
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
