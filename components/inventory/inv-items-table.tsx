"use client"

import * as React from "react"
import Link from "next/link"
import { ListFilterIcon } from "lucide-react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"

import { EditItemDialog } from "@/components/inventory/edit-item-dialog"
import { InvItemsActiveFilters } from "@/components/inventory/inv-items-active-filters"
import { InvItemsFilterDialog } from "@/components/inventory/inv-items-filter-dialog"
import { invItemsColumns } from "@/components/inventory/inv-items-columns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  EMPTY_INV_ITEM_FILTERS,
  getUniqueRoomsFromItems,
  hasActiveInvItemFilters,
  matchesInvItemFilters,
  removeFilterValue,
  type InvItemFilterField,
  type InvItemFilters,
} from "@/lib/inventory/inv-item-filters"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { InvItem } from "@/lib/types/inv-item"

function matchesSearchQuery(item: InvItem, query: string) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return true
  }

  return [item.item, item.description, item.notes]
    .filter((value): value is string => Boolean(value))
    .some((value) => value.toLowerCase().includes(normalizedQuery))
}

export function InvItemsTable({ data }: { data: InvItem[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "item", desc: false },
  ])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [appliedFilters, setAppliedFilters] =
    React.useState<InvItemFilters>(EMPTY_INV_ITEM_FILTERS)
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState<InvItem | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const roomOptions = React.useMemo(() => getUniqueRoomsFromItems(data), [data])

  const facetFilteredData = React.useMemo(
    () => data.filter((item) => matchesInvItemFilters(item, appliedFilters)),
    [data, appliedFilters],
  )

  const table = useReactTable({
    data: facetFilteredData,
    columns: invItemsColumns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) =>
      matchesSearchQuery(row.original, String(filterValue)),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  })

  function handleRowClick(item: InvItem) {
    setSelectedItem(item)
    setDialogOpen(true)
  }

  function handleDialogOpenChange(open: boolean) {
    setDialogOpen(open)

    if (!open) {
      setSelectedItem(null)
    }
  }

  function handleRemoveFilter(field: InvItemFilterField, value: string) {
    setAppliedFilters((current) => removeFilterValue(current, field, value))
  }

  const filtersActive = hasActiveInvItemFilters(appliedFilters)

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between lg:px-6">
        <div className="flex w-full gap-2 md:max-w-sm">
          <Input
            placeholder="Search items..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-full text-sm"
          />
          <Button
            type="button"
            variant={filtersActive ? "default" : "outline"}
            size="icon"
            className="hover-lift shrink-0"
            aria-label="Filter items"
            onClick={() => setFilterDialogOpen(true)}
          >
            <ListFilterIcon className="size-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-3 md:shrink-0">
          <p className="text-sm text-muted-foreground md:ml-auto">
            {table.getFilteredRowModel().rows.length} item
            {table.getFilteredRowModel().rows.length === 1 ? "" : "s"}
          </p>
          <Button
            asChild
            size="sm"
            className="hover-lift shrink-0 md:hidden"
          >
            <Link href="/add">Add Item</Link>
          </Button>
        </div>
      </div>

      <InvItemsActiveFilters
        filters={appliedFilters}
        onRemove={handleRemoveFilter}
        onClearAll={() => setAppliedFilters(EMPTY_INV_ITEM_FILTERS)}
      />

      <InvItemsFilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        appliedFilters={appliedFilters}
        onApply={setAppliedFilters}
        roomOptions={roomOptions}
      />

      <div className="mx-4 overflow-x-auto rounded-lg border lg:mx-6">
        <Table className="min-w-max">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnClassName = (
                    header.column.columnDef.meta as { className?: string } | undefined
                  )?.className

                  return (
                  <TableHead key={header.id} className={columnClassName}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => {
                    const columnClassName = (
                      cell.column.columnDef.meta as { className?: string } | undefined
                    )?.className

                    return (
                    <TableCell key={cell.id} className={columnClassName}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={invItemsColumns.length}
                  className="h-24 text-center"
                >
                  No inventory items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 px-4 pb-2 lg:px-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <EditItemDialog
        item={selectedItem}
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
      />
    </div>
  )
}
