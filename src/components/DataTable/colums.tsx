import type { ColumnDef } from "@tanstack/react-table"
import type { Plan } from "./Plan"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export const columns: ColumnDef<Plan>[] = [
    {
        accessorKey: "_id",
        header: "ID",
    },
    {
        accessorKey: "userid",
        header: "User ID",
    },
    {
        accessorKey: "date",
        // header: "Fecha",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tipo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "subtopics",
        header: "Subtemas",
        cell: ({ getValue }) => (getValue() ? (getValue() as string[]).join(", ") : "N/A"),
    },
    {
        accessorKey: "topic",
        header: "Temas",
        cell: ({ getValue }) => getValue() ?? "N/A",
    },
    {
        accessorKey: "Action",
        header: "Recrear plan",
        //Colocamos un boton para recrear el plan
        cell: ({ row }) => {
            return (
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dark:bg-slate-800" align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(row.original._id)}
                        >
                            Copiar ID del Plan
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Button onClick={() => console.log(row.original)}>
                            Recrear Plan
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
