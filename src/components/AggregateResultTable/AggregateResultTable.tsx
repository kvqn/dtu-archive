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
  useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useState } from "react"

const sortingHeader = (
  columnName: string
): React.FC<{ column: Column<AggregateStudent, unknown> }> => {
  const header = ({ column }: { column: Column<AggregateStudent> }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="w-auto h-auto bg-table-header-button-bg text-table-header-button-fg hover:bg-table-header-button-hover-bg hover:text-table-header-button-hover-fg"
      style={{ whiteSpace: "nowrap" }}
    >
      {columnName}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
  return header
}

type AggregateResultTableProps = {
  result: AggregateResult
}

export default function AggregateResultTable(props: AggregateResultTableProps) {
  const { result } = props

  const columnHelper = createColumnHelper<AggregateStudent>()

  const columns: ColumnDef<AggregateStudent, string>[] = [
    {
      id: "index",
      header: "Index",
      size: 10
    },
    {
      accessorKey: "rollno",
      header: sortingHeader("Roll No")
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name"
    },
    ...result.semesters.map((semester, index) =>
      columnHelper.accessor(
        (student: AggregateStudent) => student.cgpas[index],
        {
          id: `Sem ${semester}`,
          header: sortingHeader(`Sem ${semester}`)
        }
      )
    ),

    {
      header: sortingHeader("Aggregate"),
      accessorKey: "aggregate"
    }
    // {
    //   header: sortingHeader("Total Credits"),
    //   accessorKey: "tc"
    // }
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
      columnVisibility
    }
  })

  return <ResultTable table={table} />
}
