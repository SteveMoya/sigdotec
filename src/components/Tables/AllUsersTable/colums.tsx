import type { ColumnDef } from "@tanstack/react-table"
import type { User } from "./User"
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
import { DialogDescription, DialogHeader, DialogTitle, Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewUserSchema, roles } from "@/schemas";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

import { EditUser } from "./EditUser"


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
    {
        accessorKey: "id",
        header: "Acciones",
        cell: ({ getValue }) => {
            return (
                <>
                {/** Aqui colocamos el id del usuario obtenido del objecto column */}
                    <EditUser id={getValue() as string} />
                </>
            )
        },
    },
]