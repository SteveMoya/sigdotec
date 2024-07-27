import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ReactSelect from "react-select";
import { Loading } from "./App/Loading";
import { toast } from "sonner";
import DataDisplay from "./App/DataDisplay";
import { DownloadDOC } from "./App/DownloadButtons";

function AnualPlan() {
    const { data, isLoading, error, fetchData } = useFetch();
    const { data: data2, error: error2, fetchData: fetchData2 } = useFetch();

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
        } catch (error) {
            
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
    const selectedGrado = form.watch("grado")

    const materiaOptions = useMemo(() => {
        if (!data2) return [];
        return Object.entries(data2).map(([key, value]) => ({ key, label: value[0] }));
    }, [data2]);

    const gradoOptions = useMemo(() => {
        if (!data2 || !selectedMateria) return [];
        return Object.entries(data2[selectedMateria]?.[1] ?? {}).map(([key, value]) => ({ key, label: value[0] }));
    }, [data2, selectedMateria]);

    const memoizedData = useMemo(() => data, [data]);

    return (
        <>
            <Card className="min-w-[450px] dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-2xl">
                <CardHeader>
                    <CardTitle>Plan Anual</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="materia"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
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
                                    <FormItem className="grid gap-2">
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
                            
                            <Button type="submit" className="w-full dark:bg-primary-800 dark:text-white mt-4 dark:hover:bg-primary-900">Planificar</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            {isLoading && (<Loading />
            )}
            {data &&
                <>
                    <article className='mx-0 text-center p-7 grid sm:grid-cols-2 grid-cols-1 gap-4'>
                        <DataDisplay data={memoizedData} />
                    </article>
                    <div className="flex justify-center items-center">
                        <DownloadDOC />
                    </div>
                </>
            }
        </>
    );
}

export default AnualPlan;
