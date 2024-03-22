"use client"

import Link from "next/link"
import { useState } from "react"
import { isMobile } from "react-device-detect"
import { twMerge } from "tailwind-merge"

export function Card({
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
      className={twMerge(
        "relative flex h-[180px] w-[180px] flex-col items-center justify-center rounded-xl border bg-white p-4 text-white shadow-md transition-colors hover:text-gray-300 hover:shadow-xl lg:h-72 lg:w-[300px]",
        hover && "border-2 border-lime-900 bg-green-100",
        isMobile
          ? "pattern-dots-sm border-green-800 bg-green-50 text-gray-300"
          : "pattern-dots-md"
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="p-2 font-geist text-3xl font-bold text-black">
        {title}
      </div>
      <div
        className={twMerge(
          "text-center font-geist text-base font-normal text-black transition-all lg:text-xl",
          hover || isMobile ? "h-14" : "h-0 opacity-0",
          isMobile && "h-[60%]"
        )}
      >
        {description}
      </div>
    </Link>
  )
}
