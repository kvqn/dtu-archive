import { cn } from "@/lib/utils"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faCheck, faSort } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

import { Button } from "./ui/button"

export function BottomSearchBar({
  onChange,
  sortOptions,
  selectedSortOption,
  setSelectedSortOption,
  onSubmit,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  sortOptions?: Map<string, string>
  selectedSortOption?: string
  setSelectedSortOption?: (option: string) => void
  onSubmit: () => void
}) {
  return (
    <div className="fixed bottom-10 flex w-[95%] items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 text-lg shadow-lg dark:bg-neutral-900">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-black"
        height={"1rem"}
      />
      <input
        className="h-full flex-grow font-geist outline-none dark:bg-neutral-900"
        placeholder="Filter ..."
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />
      <Button onClick={onSubmit} variant={"outline"}>
        Search
      </Button>
      {sortOptions && selectedSortOption && setSelectedSortOption && (
        <SortButton
          options={sortOptions}
          selectedOption={selectedSortOption}
          setSelectedOption={setSelectedSortOption}
        />
      )}
    </div>
  )
}

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
          "rounded-lg bg-white px-2 transition-colors duration-200 dark:bg-neutral-950",
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
          "absolute -top-20 right-10 flex w-fit select-none flex-col whitespace-nowrap rounded-lg border border-black bg-white p-2 font-geist opacity-0 shadow-xl transition-opacity dark:bg-neutral-900",
          showMenu && "opacity-100"
        )}
      >
        <p className="text-lg font-bold">Sort By</p>
        {Array.from(options).map(([option, value]) => (
          <div
            className="flex cursor-pointer items-center gap-2 text-left"
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
