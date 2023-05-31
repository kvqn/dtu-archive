import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table"
import { useState } from "react"
import { Button } from "./ui/button"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"

const sortingHeader = (
  columnName: string
): React.FC<{ column: Column<SemesterStudent, unknown> }> => {
  return ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {columnName}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

const gradeValues: Map<string, number> = new Map([
  ["O", 10],
  ["A+", 9],
  ["A", 8],
  ["B+", 7],
  ["B", 6],
  ["C", 5],
  ["P", 4],
  ["F", 0]
])

type SemesterResultTableProps = {
  result: SemesterResult
}

export default function SemesterResultTable(props: SemesterResultTableProps) {
  const { result } = props

  const columnHelper = createColumnHelper<SemesterStudent>()

  const columns: ColumnDef<SemesterStudent>[] = [
    {
      accessorKey: "rollno",
      header: sortingHeader("Roll No")
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name"
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
          }
        }
      )
    ),

    {
      header: sortingHeader("CGPA"),
      accessorKey: "cgpa"
    },
    {
      header: sortingHeader("Total Credits"),
      accessorKey: "tc"
    },
    {
      header: "Failed Papers",
      accessorKey: "failed_papers"
    }
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

  return (
    <div className="rounded-md border">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <Input
          type="text"
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
