"use client";

import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

import SearchBar from "../../../../components/DataTableComponents/SearchBar";
import { DataTableViewOptions } from "../../../../components/DataTableComponents/DataTableViewOptions";
import { Button } from "../../../../components/ui/button";
import { ListFilter } from "lucide-react";
import DateFilters from "../../../../components/DataTableComponents/DateFilters";
import DateRangeFilter from "../../../../components/DataTableComponents/DateRangeFilter";
import { DataTablePagination } from "../../../../components/DataTableComponents/DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function ResponsiveTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchResults, setSearchResults] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isSearch, setIsSearch] = useState(true);

  const table = useReactTable({
    data: isSearch ? searchResults : filteredData,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  const cellClass = (colId: string) =>
    colId === "actions"
      ? "w-12 shrink-0 flex justify-center"
      : "flex-1 min-w-0";

  const headerClass = (colId: string) =>
    colId === "actions"
      ? "w-12 shrink-0"
      : "flex-1 min-w-0 text-xs font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <div className="space-y-4 w-full min-w-0">

      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-3">
        {/* Search */}
        <div className="w-full max-w-xs sm:max-w-sm">
          <SearchBar
            data={data}
            onSearch={setSearchResults}
            setIsSearch={setIsSearch}
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          {/* DateRangeFilter — hidden on mobile, shown sm+ */}
          <div className="hidden sm:block">
            <DateRangeFilter
              data={data}
              onFilter={setFilteredData}
              setIsSearch={setIsSearch}
            />
          </div>

          {/* DateFilters select — constrained width */}
          <div className="w-[150px] sm:w-[170px] shrink-0">
            <DateFilters
              data={data}
              onFilter={setFilteredData}
              setIsSearch={setIsSearch}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 px-2 sm:px-3 shrink-0">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only text-xs">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black w-48" align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* ── Desktop: Flexbox Table (md+) ── */}
      <div className="hidden md:block rounded-xl border border-gray-200 bg-white overflow-x-auto">
        <div className="min-w-[720px]">

          {/* Header */}
          {table.getHeaderGroups().map((headerGroup) => (
            <div
              key={headerGroup.id}
              className="flex items-center gap-3 bg-gray-50 border-b border-gray-200 px-5 py-3"
            >
              {headerGroup.headers.map((header) => (
                <div key={header.id} className={headerClass(header.column.id)}>
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </div>
              ))}
            </div>
          ))}

          {/* Rows */}
          {rows.length ? (
            rows.map((row) => (
              <div
                key={row.id}
                className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className={cellClass(cell.column.id)}>
                    <span className="text-sm text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-sm text-gray-400">
              Henüz talep bulunmuyor.
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile: Card List (<md) ── */}
      <div className="md:hidden flex flex-col gap-3">
        {rows.length ? (
          rows.map((row) => {
            const actionCells = row
              .getVisibleCells()
              .filter((c) => c.column.id === "actions");
            const dataCells = row
              .getVisibleCells()
              .filter((c) => c.column.id !== "actions");

            return (
              <div
                key={row.id}
                className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                {/* Data rows */}
                <div className="divide-y divide-gray-100">
                  {dataCells.map((cell) => {
                    const headerDef = cell.column.columnDef.header;
                    const label =
                      typeof headerDef === "string"
                        ? headerDef
                        : cell.column.id.charAt(0).toUpperCase() +
                          cell.column.id.slice(1);
                    return (
                      <div
                        key={cell.id}
                        className="flex items-start gap-2 px-4 py-2.5"
                      >
                        {/* Label */}
                        <span className="w-20 shrink-0 text-xs font-medium text-gray-400 pt-0.5">
                          {label}
                        </span>
                        {/* Value */}
                        <div className="flex-1 min-w-0 text-sm text-gray-800 font-medium break-words overflow-hidden">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Actions footer */}
                {actionCells.length > 0 && (
                  <div className="flex flex-wrap justify-end gap-2 px-4 py-2 bg-gray-50 border-t border-gray-100">
                    {actionCells.map((cell) => (
                      <span key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-10 text-center text-sm text-gray-400">
            Henüz talep bulunmuyor.
          </div>
        )}
      </div>

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
