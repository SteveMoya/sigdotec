import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    type SortingState,
    getSortedRowModel,
    getFilteredRowModel,
    type VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import { columns } from "@/components/Tables/TransactionalsTable/colums";
import { DialogClose } from "@radix-ui/react-dialog"
import { PaymentForm } from "@/components/Payment/PaymetForm"

interface DataTableProps<TData, TValue> {
    data: TData[]
}

export function TransactionalTable<TData, TValue>({
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,

        state: {
            sorting,
            globalFilter,
            columnVisibility,
        },
    })

    return (
        <>
            <div className="flex items-center py-4 ">
            
                
                <Input
                    placeholder="Buscar..."
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="ml-auto mb-4 sm:mb-0 mr-4 inline-flex items-center bg-white border border-primary-300 focus:outline-none hover:bg-primary-100 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-primary-700 dark:text-white dark:hover:bg-primary-800"><span className="icon-[mdi--wallet-plus] mr-2"></span> Recargar </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Recargar Cartera</DialogTitle>
                            <DialogDescription>
                                Carga fondos a tu cartera a través de PayPal.
                            </DialogDescription>
                        </DialogHeader>
                        <PaymentForm  />
                        
                    </DialogContent>
                </Dialog>
                
            </div>
            <div className="rounded-xl border shadow-2xl dark:border-gray-600 ">
                <Table className=" shadow-2xl ">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="p-4 text-xs font-medium tracking-wider text-left dark:border-gray-500 uppercase" key={header.id}>
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
                    <TableBody className="">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow className="p-4 text-sm font-normal whitespace-nowrap bg-white dark:bg-gray-800 dark:text-white  even:bg-gray-50 dark:even:bg-gray-700 odd:bg-white dark:odd:bg-gray-800 border-none border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200 ease-in-out
"
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
                                <TableCell colSpan={columns.length} className="h-32 text-center content-center text-xl">
                                    Todavia no haz recargado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>
            </div>
        </>
    )
}
