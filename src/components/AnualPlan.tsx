import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { AnualPlanFormSchema } from "@/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";

function AnualPlan() {
    const { data, isLoading, error, fetchData } = useFetch();
    const { data: data2, error: error2, fetchData: fetchData2 } = useFetch();
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => { 
        fetchData2(`/api/ai/alltopic`, 'GET');
    }, []);

    const form = useForm<z.infer<typeof AnualPlanFormSchema>>({
        resolver: zodResolver(AnualPlanFormSchema),
        defaultValues: {
            materia: "",
            grado: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof AnualPlanFormSchema>) => {
        try {
            const res = await fetch("/api/ai/anualplan", {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (!res.ok) {
                throw new Error('Error downloading the document');
            }
            console.log("Valores del formulario", values);
            const blob = await res?.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `plan-anual.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url)
            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
            toast.error('Error al descargar el documento');
        }
    };

    useEffect(() => {
        if (error) toast.error(`Error: ${error}`);
        if (data) toast.success('Plan de unidad generado correctamente');
        if (isLoading) toast.loading('Cargando temas');
        return () => {
            toast.dismiss();
        };
    }, [data, error, isLoading]);

    const selectedMateria = form.watch("materia");

    const materiaOptions = useMemo(() => {
        if (!data2) return [];
        return Object.entries(data2).map(([key, value]) => ({ key, label: value[0] }));
    }, [data2]);

    const gradoOptions = useMemo(() => {
        if (!data2 || !selectedMateria) return [];
        return Object.entries(data2[selectedMateria]?.[1] ?? {}).map(([key, value]) => ({ key, label: value[0] }));
    }, [data2, selectedMateria]);

    return (
        <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="materia"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Selecciona tu Asignatura</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona tu Asignatura aquí" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {materiaOptions.map(option => (
                                                        <SelectItem key={option.key} value={option.key}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="grado"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Selecciona tu Grado</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} disabled={!selectedMateria}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona tu Grado aquí" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {gradoOptions.map(option => (
                                                        <SelectItem key={option.key} value={option.key}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                    <Button type="submit" disabled={isLoading} className="w-full dark:bg-primary-800 dark:text-white mt-4 dark:hover:bg-primary-900">
                                {
                                    isLoading ? 'Cargando...' : isSubmitted ? 'Volver a Planificar' : 'Planificar'
                                }
                            </Button>
                        </form>
                    </Form>
        </>
    );
}

export default AnualPlan;
