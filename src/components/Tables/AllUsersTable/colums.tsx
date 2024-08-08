import type { ColumnDef } from "@tanstack/react-table"
import type { User } from "./User"

import { ArrowUpDown } from "lucide-react"


export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "username",
        header: "Nombre",
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    }, 
    {
        accessorKey: "email",
        header: "Email",
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
                    Fecha de Creacion
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "emailVerificated",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Verificado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => getValue() ? "Si" : "No",
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "provider",
        header: "Proveedor",
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "balance",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Balance
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => `$${getValue()}`,
        enableGlobalFilter: true,
    },
]