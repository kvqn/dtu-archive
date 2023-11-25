import { Navbar } from "@/components/Navbar/Navbar"
import { GeistSans } from "geist/font/sans"
import { twMerge } from "tailwind-merge"

// import { GeistMono } from 'geist/font/mono';

export default function Page() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div
          className={twMerge(
            "flex w-full justify-center text-5xl font-black text-center items-center flex-grow",
            GeistSans.className,
          )}
        >
          A collection of much needed resources for DTU students.
        </div>
      </div>
    </>
  )
}
