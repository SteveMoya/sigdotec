import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Servicios() {
    return (
        <div>
            <section className="w-full py-12">
                <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <div className="grid gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">Precios de los Planes</h1>
                            <p className="text-muted-foreground">¡Así de fácil puedes planificar!.</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Planes de Clase y de Unidad</CardTitle>
                                <div className="text-4xl font-bold">$50</div>
                                <p className="text-muted-foreground">Pesos Dominicanos (DOP) </p>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div>
                                    <h3 className="font-semibold mb-2">¿Qué incluye?</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            Secuencia didáctica	única y completa
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            Contenidos de la malla curricular dominicana
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            Lista de recursos y actividades para la evaluación
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-primary-800">Planificar</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Plan Anual</CardTitle>
                                <div className="text-4xl font-bold">$800</div>
                                <p className="text-muted-foreground">Pesos Dominicanos (DOP)</p>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div>
                                    <h3 className="font-semibold mb-2">¿Qué incluye?</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            +100 planes de clase por grado y asignatura
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            Secuencias didácticas
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            Contenidos curriculares
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Planificar</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="w-full py-12">
                <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <div className="grid gap-1">
                            <h1 className="text-3xl font-bold tracking-tight">Comparativa</h1>
                            <p className="text-muted-foregroundfont-semibold">Conoce la diferencia entre todos estos planes</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-4 pr-4 font-medium">Contenidos</th>
                                    <th className="py-4 pr-4 font-medium">Planes de Clase y de Unidad</th>
                                    <th className="py-4 pr-4 font-medium">Plan Anual</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-4 pr-4">Secuencia didáctica</td>
                                    <td className="py-4 pr-4">Única para cada plan de clase</td>
                                    <td className="py-4 pr-4">Estandar para los contenidos</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-4 pr-4">Contenidos</td>
                                    <td className="py-4 pr-4">Currículo enriquecido</td>
                                    <td className="py-4 pr-4">Currículo dominicano</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-4 pr-4">Componentes adicionales</td>
                                    <td className="py-4 pr-4">Recursos, actividades de evaluacion y preguntas esenciales</td>
                                    <td className="py-4 pr-4">No incluidos</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4">Precio</td>
                                    <td className="py-4 pr-4">$50DOP /por plan</td>
                                    <td className="py-4 pr-4">$800DOP /por grado</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}