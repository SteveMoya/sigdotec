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

const fetchPDF = async (planID: string) => { 
    try {
        const res = await fetch("/api/ai/download/recover-pdf",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ planID: planID }),
            }
        )
        
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `plan.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log(error)
    }
}  
const fetchWord = async (planID: string) => {
    try {
        const res = await fetch("/api/ai/download/recover-word",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ planID: planID }),
            }
        )
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `plan.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log(error)
    }
}


export const columns: ColumnDef<Plan>[] = [
    {
        accessorKey: "topic",
        header: "Temas",
        cell: ({ getValue }) => getValue() ?? "N/A",
        enableGlobalFilter: true,
    },
    {
        accessorKey: "subtopics",
        header: "Subtemas",
        cell: ({ getValue }) => (getValue() ? (getValue() as string[]).join(", ") : "N/A"),
        enableGlobalFilter: true,
    },
    {
        accessorKey: "date",
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
        enableGlobalFilter: true,
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
        enableGlobalFilter: true,
    },
    
    {
        accessorKey: "Action",
        header: "Recrear plan",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir Menu de Descarga</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dark:bg-slate-800" align="end">
                        <DropdownMenuLabel>Descargar</DropdownMenuLabel>
                        <DropdownMenuItem
                        >
                            <button onClick={() => fetchWord(row.original._id)}
                                type="button"
                                className="px-4 py-3 bg-[#2B599A] hover:bg-secondary-900 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex items-center"
                            >
                                <span className="icon-[mdi--arrow-collapse-down]"></span>
                                <span className="mx-2">Descargar en .DOCX</span>
                                <span className="icon-[mdi--microsoft-word]"></span>
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem
                        >
                            <button onClick={fetchPDF.bind(null, row.original._id)}
                                type="button"
                                className="px-4 py-3 bg-[#F5160A] hover:bg-red-700 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex items-center"
                            >
                                <span className="icon-[mdi--arrow-collapse-down]"></span>
                                <span className="mx-2">Descargar en PDF</span>
                                <span className="icon-[mdi--file-pdf-box]"></span>
                            </button>
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]