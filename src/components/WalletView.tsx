import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { SVGProps } from "react"
import type { JSX } from "react/jsx-runtime"

export default function WalletView() {
    return (
        <div className="flex flex-col gap-6 p-6 md:p-8">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Mi Billetera</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MoveHorizontalIcon className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <FilterIcon className="mr-2 h-4 w-4" />
                            Filtrar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ListOrderedIcon className="mr-2 h-4 w-4" />
                            Ordenar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
                <div className="rounded-lg bg-primary p-6 text-primary-foreground">
                    <div className="mb-2 text-sm font-medium">Balance actual</div>
                    <div className="text-6xl font-bold">$3,456.78</div>
                </div>
                <Button size="sm" className="w-full">
                    Recargar Balance
                </Button>
            </div>
            <div className="rounded-lg border">
                <div className="border-b p-4 font-medium">Transacciones recientes</div>
                <div className="divide-y">
                    <div className="flex items-center justify-between gap-4 p-4">
                        <div>
                            <div className="text-sm font-medium">Recarga de saldo</div>
                            <div className="text-xs text-muted-foreground">24 de abril, 2023</div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-green-500">+$50.00</div>
                            <div className="text-xs text-muted-foreground">Recarga</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 p-4">
                        <div>
                            <div className="text-sm font-medium">Pago de servicio</div>
                            <div className="text-xs text-muted-foreground">20 de abril, 2023</div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-red-500">-$25.00</div>
                            <div className="text-xs text-muted-foreground">Pago</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 p-4">
                        <div>
                            <div className="text-sm font-medium">Retiro de efectivo</div>
                            <div className="text-xs text-muted-foreground">18 de abril, 2023</div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-red-500">-$100.00</div>
                            <div className="text-xs text-muted-foreground">Retiro</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 p-4">
                        <div>
                            <div className="text-sm font-medium">Recarga de saldo</div>
                            <div className="text-xs text-muted-foreground">15 de abril, 2023</div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-green-500">+$75.00</div>
                            <div className="text-xs text-muted-foreground">Recarga</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FilterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    )
}


function ListOrderedIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="10" x2="21" y1="6" y2="6" />
            <line x1="10" x2="21" y1="12" y2="12" />
            <line x1="10" x2="21" y1="18" y2="18" />
            <path d="M4 6h1v4" />
            <path d="M4 10h2" />
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
        </svg>
    )
}


function MoveHorizontalIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="18 8 22 12 18 16" />
            <polyline points="6 8 2 12 6 16" />
            <line x1="2" x2="22" y1="12" y2="12" />
        </svg>
    )
}