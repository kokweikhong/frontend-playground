import React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableHead, TableCell } from "../components/ui/table";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";

import data from "../public/expensesRecords.json";
import { cn } from "../lib/utils";

const columnHelper = createColumnHelper<ExpenensesRecord>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
    sortingFn: (a, b) => {
      const aDate = new Date(a.getValue("date"));
      const bDate = new Date(b.getValue("date"));
      return aDate.getTime() - bDate.getTime();
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("currency", {
    header: "Currency",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => (
      <span className="inline-flex items-center gap-x-1.5 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        <svg
          className="h-1.5 w-1.5 fill-yellow-500"
          viewBox="0 0 6 6"
          aria-hidden="true"
        >
          <circle cx={3} cy={3} r={3} />
        </svg>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("remarks", {
    header: "Remarks",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => info.getValue(),
  }),
];

interface ExpenensesRecord {
  id: number;
  date: string;
  name: string;
  category: string;
  currency: string;
  amount: number;
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="block w-[250px] rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  );
};

const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
      className,
    )}
    {...props}
  />
));

function App() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string | undefined>();
  const rerender = React.useReducer(() => ({}), {})[1] as () => void;

  const table = useReactTable({
    data,
    columns,
    enableSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    debugTable: true,
  });

  return (
    <main className="container mx-auto sm:px-6 lg:px-8">
      <div className="ronded-sm border border-[#E5E7EB] bg-white py-[2.5rem]">
        <div className="px-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Expenses Records
              </h1>
              {/* <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p> */}
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Record
              </button>
            </div>
          </div>
          <div className="flow-root mt-8">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 border shadow font-lg border-block"
              placeholder="Search all columns..."
            />
            <div
              className={cn(
                "relative h-[600px] min-w-full overflow-auto py-2 align-middle",
                "scrollbar-corner-slate-100 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100",
              )}
            >
              <Table className="border-separate border-spacing-0">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className={cn(
                            "sticky top-0 z-20",
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            ) === "Remarks" && "hidden lg:table-cell",
                          )}
                        >
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none flex gap-3 whitespace-nowrap items-center"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            <span>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </span>
                            {{
                              asc: <ChevronUpIcon className="w-4 h-4" />,
                              desc: <ChevronDownIcon className="w-4 h-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </TableHead>
                      ))}
                    </tr>
                  ))}
                </thead>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex space-x-2">
                <span className="flex items-center gap-1">
                  <div>Page</div>
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
                </span>
                <div>
                  <select
                    name="location"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className="flex items-center gap-1">
                  Go to page:
                  <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="block w-16 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </span>
                <div
                  className="inline-flex -space-x-px rounded-md shadow-sm isolate"
                  aria-label="Pagination"
                >
                  <NavigationButton
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">First</span>
                    <ChevronDoubleLeftIcon
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  </NavigationButton>
                  <NavigationButton
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                  </NavigationButton>
                  <NavigationButton
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                  </NavigationButton>
                  <NavigationButton
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Last</span>
                    <ChevronDoubleRightIcon
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  </NavigationButton>
                </div>
              </div>

              {/* <div className="h-4">
            <button onClick={rerender}>rerender</button>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
