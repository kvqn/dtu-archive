import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

type ResultTableProps = {
  table:
    | import("@tanstack/table-core").Table<AggregateStudent>
    | import("@tanstack/table-core").Table<SemesterStudent>;
};

export default function ResultTable(props: ResultTableProps) {
  const { table } = props;

  return (
    <>
      <div className="mx-10 mt-4 flex justify-between">
        <Input
          type="text"
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="m-10 overflow-hidden rounded-lg border-2 border-table-border-color bg-zinc-900">
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
                        "text-table-header-fg hover:text-table-header-hover-fg" +
                        (header.id != "name" ? " text-center" : "")
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
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
                      className={
                        "font-regular font-roboto uppercase" +
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
  );
}
