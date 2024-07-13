
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
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { DemographicSchema, gender, provinces, subjects } from "@/schemas/authentification"
import { toast } from "sonner"

export default function demographyForm() {
    const form = useForm<z.infer<typeof DemographicSchema>>({
        resolver: zodResolver(DemographicSchema),
        defaultValues: {
        },
    })

    async function onSubmit(values: z.infer<typeof DemographicSchema>) {
        if (values.birthdate) {
            values.birthdate = new Date(values.birthdate);
        }
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
            if(res.redirected) {
                setTimeout(() => {
                    window.location.href = res.url
                }, 2000)
            }
            // window.location.href = '/app/'

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
                                name="birthdate"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel className="font-semibold text-lg">Fecha de nacimiento</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            " pl-3 text-left font-normal w-full",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            
                                                            format(field.value, "dd/MM/yyyy")
                                                        ) : (
                                                            <span>Selecciona la fecha</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date: Date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
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