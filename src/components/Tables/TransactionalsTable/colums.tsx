import type { ColumnDef } from "@tanstack/react-table"
import type { Transaction } from "./Transaction"

import { ArrowUpDown } from "lucide-react"


export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: "transactionid",
        header: "ID-Transacción",
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "userid",
        header: "Usuario",
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "date",
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
                    Monto
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => `$${getValue()}`,
        enableGlobalFilter: true,
    },
]