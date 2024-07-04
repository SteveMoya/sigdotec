
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import { DemographicSchema, gender, provinces, subjects } from "@/schemas/authentification"
import { toast } from "sonner"

export default function DemografyForm() {
    const form = useForm<z.infer<typeof DemographicSchema>>({
        resolver: zodResolver(DemographicSchema),
        defaultValues: {
        },
    })

    async function onSubmit(values: z.infer<typeof DemographicSchema>) {
        console.log(values)
        try {

            const res = await fetch("/auth/datos-demograficos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            console.log(res)
            if (res.ok) {
                toast.success("Datos guardados exitosamente")
            } else {
                toast.error("Datos Invalidos.")
            }
            window.location.href = '/app/'

        } catch (error) {
            console.log(error)
            toast.error("Error al guardar los datos.")
        }
    }

    return (
        <> 
            <CardContent className="space-y-6">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                            <FormField 
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel className="font-semibold text-lg">Edad</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu edad aqui" type="number" min="1" pattern="^[0-9]+" {...field} 
                                         // Aqui arreglamos el envio del string y lo convertimos a numero con parseInt
                                        onChange={(e) => field.onChange(parseInt(e.target.value))
                                        }
                                         />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />{" "}
                            <FormField 
                            control={form.control}
                            name="province"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel className="font-semibold text-lg">Provincia</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona tu provincia aqui" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {provinces.map((i) => (
                                                    <SelectItem value={i} key={i}>
                                                        {i}
                                                    </SelectItem>
                                                )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <FormField 
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel className="font-semibold text-lg">Género</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona tu género" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {gender.map((i) => (
                                                    <SelectItem value={i} key={i}>
                                                        {i}
                                                    </SelectItem>
                                                )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <FormField 
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-semibold text-lg">Asignatura que Impartes</FormLabel>

                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona la asignatura que impartes" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {subjects.map((i) => (
                                                        <SelectItem value={i} key={i}>
                                                            {i}
                                                        </SelectItem>
                                                    )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                       
                        <FormField 
                            control={form.control}
                            name="workingPlace"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel className="font-semibold text-lg">Lugar de Trabajo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tu lugar de trabajo aqui" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full  hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white dark:hover:text-white">Guardar Datos</Button>
                    </form>
                </Form>
               
            </CardContent>
            
        </>
    )
}