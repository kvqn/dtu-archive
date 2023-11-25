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
