"use client"

import Link from "next/link"
import { useState } from "react"
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
        "pattern-dots-sm group relative flex h-[180px] w-[180px] flex-col items-center justify-center rounded-xl border border-green-800 bg-green-50 p-4 text-black shadow-md transition-colors hover:text-gray-300 hover:shadow-xl dark:bg-neutral-800 dark:text-white lg:h-72 lg:w-[300px] lg:bg-white lg:text-white",
        hover && "lg:border-2 lg:border-lime-900 lg:bg-green-100"
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="font-geist dark:text-whtie p-2 text-3xl font-bold text-black">
        {title}
      </div>
      <div
        className={twMerge(
          "font-geist h-[60%] text-center text-base font-normal text-black transition-all lg:text-xl",
          hover ? "lg:h-14" : "lg:h-0 lg:opacity-0"
        )}
      >
        {description}
      </div>
    </Link>
  )
}
