"use client"

import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"

export function Footer() {
  const [hover, setHover] = useState(false)
  return (
    <Link
      className="group fixed bottom-0 flex w-full cursor-pointer items-center justify-center gap-1 bg-gray-50 py-1 text-base hover:font-bold"
      href="https://github.com/kvqn/dtu-archive"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Star
      {hover ? (
        <FontAwesomeIcon icon={faStarSolid} className="h-4" />
      ) : (
        <FontAwesomeIcon icon={faStarRegular} className="h-4" />
      )}
      this project on GitHub
    </Link>
  )
}
