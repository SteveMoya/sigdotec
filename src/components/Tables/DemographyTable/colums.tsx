import type { ColumnDef } from "@tanstack/react-table"
import type { Demography } from "./Demography"
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

import { EditDemography } from "./EditDemography"


export const columns: ColumnDef<Demography>[] = [
    {
        accessorKey: "userId",
        header: "ID de Usuario",
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    }, 
    {
        accessorKey: "province",
        header: "Provincia",
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "gender",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Sexo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "birthdate",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha de Nacimiento
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
    },
    {
        accessorKey: "subject",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Asignatura
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "workingPlace",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Lugar de Trabajo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => getValue(),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "id",
        header: "Acciones",
        cell: ({ getValue }) => {
            return (
                <>
                {/** Aqui colocamos el id del usuario obtenido del objecto column */}
                    <EditDemography id={getValue() as string} />
                </>
            )
        },
    },
]