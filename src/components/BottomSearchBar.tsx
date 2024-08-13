import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { SortButton } from "./SortButton"
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
