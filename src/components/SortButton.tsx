"use client"

import { cn } from "@/lib/utils"
import { faCheck, faSort } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export function SortButton({
  options,
  selectedOption,
  setSelectedOption,
}: {
  options: Map<string, string>
  selectedOption: string
  setSelectedOption: (value: string) => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="relative">
      <div
        className={cn(
          "rounded-lg bg-white px-2 transition-colors duration-200",
          showMenu && "bg-green-200"
        )}
      >
        <FontAwesomeIcon
          icon={faSort}
          className={cn(
            "cursor-pointer duration-200",
            showMenu && "rotate-180"
          )}
          onClick={() => {
            setShowMenu(!showMenu)
          }}
        />
      </div>
      <div
        className={cn(
          "absolute -top-20 right-10 flex w-fit select-none flex-col whitespace-nowrap rounded-lg border border-black bg-white p-2 font-geist opacity-0 shadow-xl transition-opacity",
          showMenu && "opacity-100"
        )}
      >
        <p className="text-lg font-bold">Sort By</p>
        {Array.from(options).map(([option, value]) => (
          <div
            className="flex items-center gap-2 text-left"
            key={value}
            onClick={() => {
              setSelectedOption(value)
              setShowMenu(false)
            }}
          >
            {option}
            {value === selectedOption && <FontAwesomeIcon icon={faCheck} />}
          </div>
        ))}
      </div>
    </div>
  )
}
