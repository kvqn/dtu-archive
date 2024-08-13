"use client"

import Image from "next/image"
import { useState } from "react"

import { Navbar } from "./Navbar/Navbar"

export function LoadingPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-grow flex-col items-center justify-center gap-4">
        <Image
          src="/doof.gif"
          width={300}
          height={300}
          alt="doof"
          className="shadow-2xl"
        />
        <TripleDots />
      </div>
    </div>
  )
}

function TripleDots() {
  const [dots, setDots] = useState(0)
  setTimeout(() => {
    setDots((dots + 1) % 3)
  }, 500)
  return (
    <div className="flex h-12 items-center justify-center gap-1">
      <div className="h-2 w-2 rounded-full bg-gray-600"></div>
      {Array.from({ length: dots }).map((_, index) => (
        <div key={index} className="h-2 w-2 rounded-full bg-gray-600"></div>
      ))}
    </div>
  )
}
