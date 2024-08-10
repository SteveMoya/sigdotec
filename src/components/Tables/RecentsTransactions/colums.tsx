import type { ColumnDef } from "@tanstack/react-table"
import type { Transaction } from "./Transaction"

import { ArrowUpDown } from "lucide-react"


export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "transactionid",
        header: "ID-Transacción",
        cell: ({ getValue }) => `***${getValue().slice(-4)}`,
        enableGlobalFilter: true,
    },
    {
        accessorKey: "userId",
        header: "ID-Usuario",
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tipo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Monto (USD)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => `$${getValue()}`,
        enableGlobalFilter: true,
    },
]