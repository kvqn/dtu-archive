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
import { flexRender } from "@tanstack/react-table"

type ResultTableProps = {
  table:
    | import("@tanstack/table-core").Table<AggregateStudent>
    | import("@tanstack/table-core").Table<SemesterStudent>
}

export default function ResultTable(props: ResultTableProps) {
  const { table } = props

  return (
    <>
      <div className="mx-10 mt-4 flex justify-between">
        <input
          type="text"
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-80 max-w-sm rounded-xl border-2 border-neutral-400 p-2 active:border-neutral-800"
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

      <div className="m-10 overflow-hidden rounded-lg border-2 border-table-border-color font-geist dark:bg-zinc-900">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-neutral-500 bg-table-header-bg hover:bg-table-header-hover-bg dark:border-neutral-300"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        "text-lg font-bold text-table-header-fg hover:text-table-header-hover-fg" +
                        (header.id != "name" ? " text-center" : "")
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
                  className="border-neutral-200 bg-table-row-bg text-table-row-fg transition-colors hover:bg-gray-200 hover:text-table-row-hover-fg dark:border-neutral-700 dark:hover:bg-zinc-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        "font-regular uppercase" +
                        (cell.column.id != "name" ? " text-center" : "")
                      }
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
                  className="h-24 bg-table-row-bg text-center text-table-row-fg hover:bg-table-row-hover-bg hover:text-table-row-hover-fg"
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
