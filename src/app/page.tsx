import { Navbar } from "@/components/Navbar/Navbar"
import { GeistSans } from "geist/font/sans"
import { twMerge } from "tailwind-merge"

// import { GeistMono } from 'geist/font/mono';

export default function Page() {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Navbar />
        <div
          className={twMerge(
            "flex w-full flex-grow items-center justify-center text-center text-5xl font-black",
            GeistSans.className
          )}
        >
          A collection of much needed resources for DTU students.
        </div>
      </div>
    </>
  )
}
