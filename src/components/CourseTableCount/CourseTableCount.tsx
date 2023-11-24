import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CourseTableDataCount } from "@/lib/courses"
import { flexRender } from "@tanstack/react-table"
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

const sortingHeader = (
  columnName: string
): React.FC<{ column: Column<CourseTableDataCount, unknown> }> => {
  const header = ({ column }: { column: Column<CourseTableDataCount> }) => (
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

type CourseTableProps = {
  courses: CourseTableDataCount[]
}

export default function CourseTableCount(props: CourseTableProps) {
  const { courses } = props

  const columnHelper = createColumnHelper<CourseTableDataCount>()

  const columns: ColumnDef<CourseTableDataCount, string>[] = [
    {
      id: "index",
      header: "Index",
      size: 10,
    },
    {
      accessorKey: "course",
      header: sortingHeader("Course"),
    },
    {
      accessorKey: "n_students",
      header: sortingHeader("Students"),
    },
    {
      header: sortingHeader("Average"),
      accessorKey: "average",
    },
    {
      header: sortingHeader("O"),
      accessorKey: "o",
    },
    {
      header: sortingHeader("A+"),
      accessorKey: "a_plus",
    },
    {
      header: sortingHeader("A"),
      accessorKey: "a",
    },
    {
      header: sortingHeader("B+"),
      accessorKey: "b_plus",
    },
    {
      header: sortingHeader("B"),
      accessorKey: "b",
    },
    {
      header: sortingHeader("C"),
      accessorKey: "c",
    },
    {
      header: sortingHeader("P"),
      accessorKey: "p",
    },
    {
      header: sortingHeader("F"),
      accessorKey: "f",
    },
  ]

  const data = courses

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

  return (
    <>
      <div className="flex justify-between mx-10 mt-4">
        <Input
          type="text"
          placeholder="Filter courses..."
          value={(table.getColumn("course")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("course")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-table-dropdown-button-bg text-table-dropdown-button-fg hover:bg-table-dropdown-button-hover-bg hover:text-table-dropdown-button-hover-fg">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-table-dropdown-bg text-table-dropdown-fg"
          >
            {table
              .getAllColumns()
              // @ts-ignore
              .filter((column: any) => column.getCanHide())
              .map((column: any) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="focus:bg-table-dropdown-hover-bg focus:text-table-dropdown-hover-fg"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    onClick={(e) => {}}
                  >
                    <p className="uppercase">{column.id}</p>
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-lg border-2 m-10 bg-zinc-900">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-table-header-bg hover:bg-table-header-hover-bg"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        "text-table-header-fg hover:text-table-header-hover-fg"
                      }
                    >
                      {flexRender(
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
              table.getRowModel().rows.map((row, row_index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="bg-table-row-bg text-table-row-fg hover:bg-table-row-hover-bg hover:text-table-row-hover-fg"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={"uppercase font-roboto font-regular"}
                    >
                      {cell.column.id == "index"
                        ? row_index + 1
                        : flexRender(
                            // @ts-ignore
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center bg-table-row-bg text-table-row-fg hover:bg-table-row-hover-bg hover:text-table-row-hover-fg"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
