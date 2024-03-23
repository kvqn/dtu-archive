import ResultTable from "@/components/ResultTable/ResultTable"
import { Button } from "@/components/ui/button"
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useState } from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

const sortingHeader = (
  columnName: string
): React.FC<{ column: Column<SemesterStudent, unknown> }> => {
  const header = ({ column }: { column: Column<SemesterStudent> }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="h-auto w-auto hover:bg-green-500"
      style={{ whiteSpace: "nowrap" }}
    >
      {columnName}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
  return header
}

const gradeValues: Map<string, number> = new Map([
  ["O", 10],
  ["A+", 9],
  ["A", 8],
  ["B+", 7],
  ["B", 6],
  ["C", 5],
  ["P", 4],
  ["F", 0],
])

type SemesterResultTableProps = {
  result: SemesterResult
}

export default function SemesterResultTable(props: SemesterResultTableProps) {
  const { result } = props

  const columnHelper = createColumnHelper<SemesterStudent>()

  const columns: ColumnDef<SemesterStudent, string>[] = [
    {
      header: "Index",
      id: "index",
    },
    {
      accessorKey: "rollno",
      header: sortingHeader("Roll No"),
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
    },
    ...result.subjects.map((subject, index) =>
      columnHelper.accessor(
        (student: SemesterStudent) => student.grades[index],
        {
          id: subject,
          header: sortingHeader(subject),
          sortingFn: (rowA, rowB, columnId) => {
            const gradeA = gradeValues.get(rowA.getValue(columnId))
            const gradeB = gradeValues.get(rowB.getValue(columnId))
            if (gradeA && gradeB) return gradeA - gradeB
            return 0
          },
          cell: ({ row }) => {
            if (row.original.grades[index] == null) return <></>
            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="h-full w-full">
                      {row.original.grades[index]}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {row.original.subjects[index]}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          },
        }
      )
    ),

    {
      header: sortingHeader("CGPA"),
      accessorKey: "cgpa",
    },
    {
      header: sortingHeader("Total Credits"),
      accessorKey: "tc",
    },
    {
      header: "Failed Papers",
      accessorKey: "failed_papers",
    },
  ]

  const data = result.students

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return <ResultTable table={table} />
}
