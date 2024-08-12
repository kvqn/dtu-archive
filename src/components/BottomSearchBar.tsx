import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { SortButton } from "./SortButton"

export function BottomSearchBar({
  onChange,
  sortOptions,
  selectedSortOption,
  setSelectedSortOption,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  sortOptions?: Map<string, string>
  selectedSortOption?: string
  setSelectedSortOption?: (option: string) => void
}) {
  return (
    <div className="fixed bottom-10 flex h-10 w-[95%] items-center gap-2 rounded-lg border-2 border-black bg-white p-2 text-lg shadow-lg dark:bg-neutral-900">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black" />
      <input
        className="font-geist flex-grow outline-none dark:bg-neutral-900"
        placeholder="Filter ..."
        onChange={onChange}
      />
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
