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
import { ClassPlanFormSchema } from "@/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useFetch } from "@/hooks/useFetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ReactSelect from "react-select";
import { Loading } from "./App/Loading";
import { toast } from "sonner";
import DataDisplay from "./App/DataDisplay";
import { DownloadDOC, DownloadPDF } from "./App/DownloadButtons";

function ClassPlanMultiSteps() {
    const { data, isLoading, error, fetchData } = useFetch();
    const { data: data2, error: error2, fetchData: fetchData2 } = useFetch();

    useEffect(() => {
        fetchData2(`/api/ai/alltopic`, 'GET');
    }, []);

    const form = useForm<z.infer<typeof ClassPlanFormSchema>>({
        resolver: zodResolver(ClassPlanFormSchema),
        defaultValues: {
            materia: "",
            grado: "",
            tema: "",
            subtema: [],
        },
    });

    const onSubmit = (values: z.infer<typeof ClassPlanFormSchema>) => {
        console.log("Valores del formulario", values);
        fetchData(`/api/ai/classplan`, 'POST', values.subtema)
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
    const selectedGrado = form.watch("grado");
    const selectedTema = form.watch("tema");

    const materiaOptions = useMemo(() => {
        if (!data2) return [];
        return Object.entries(data2).map(([key, value]) => ({ key, label: value[0] }));
    }, [data2]);

    const gradoOptions = useMemo(() => {
        if (!data2 || !selectedMateria) return [];
        return Object.entries(data2[selectedMateria]?.[1] ?? {}).map(([key, value]) => ({ key, label: value[0] }));
    }, [data2, selectedMateria]);

    const temaOptions = useMemo(() => {
        if (!data2 || !selectedMateria || !selectedGrado) return [];
        return Object.entries(data2[selectedMateria]?.[1]?.[selectedGrado]?.[1] ?? {}).map(([key, value]) => ({ key, label: value[0] }));
    }, [data2, selectedMateria, selectedGrado]);

    const subtemaOptions = useMemo(() => {
        if (!data2 || !selectedMateria || !selectedGrado || !selectedTema) return [];
        return Object.entries(data2[selectedMateria]?.[1]?.[selectedGrado]?.[1]?.[selectedTema]?.[1] ?? {}).map(([key, value]) => ({ key, label: value }));
    }, [data2, selectedMateria, selectedGrado, selectedTema]);

    const memoizedData = useMemo(() => data, [data]);

    return (
        <>
            <Card className="min-w-[450px] dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-2xl">
                <CardHeader>
                    <CardTitle>Plan de Clase</CardTitle>
                    {/* Colocar descripcion */}
                </CardHeader>
                <CardContent>
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
                                    <FormItem>
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
                            <FormField
                                control={form.control}
                                name="tema"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Selecciona tu Tema</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} disabled={!selectedGrado}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona tu Tema aquí" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {temaOptions.map(option => (
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
                                name="subtema"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Selecciona tus Subtemas</FormLabel>
                                        <FormControl>
                                            <Controller
                                                name="subtema"
                                                control={form.control}
                                                render={({ field }) => (
                                                    <ReactSelect
                                                        {...field}
                                                        isMulti
                                                        options={subtemaOptions}
                                                        getOptionLabel={option => option.label}
                                                        getOptionValue={option => option.key}
                                                        isDisabled={!selectedTema}
                                                        onChange={(selectedOptions) => field.onChange(selectedOptions.map(option => option.key))}
                                                        value={subtemaOptions.filter(option => field.value.includes(option.key))}
                                                        placeholder="Selecciona tus subtemas aquí"
                                                        className="w-full
                                                        border-gray-300
                                                        focus:border-blue-500
                                                        focus:ring focus:ring-blue-200
                                                        rounded-md
                                                        shadow-sm
                                                        dark:text-white
                                                        dark:bg-gray-800
                                                        dark:border-gray-700
                                                        dark:focus:border-blue-500
                                                        dark:focus:ring
                                                        dark:placeholder-gray-400
                                                        dark:hover:border-gray-500
                                                        dark:hover:bg-gray-700"
                                                    />
                                                )}
                                            />
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
                    <DownloadPDF />
                    </div>
                </>
            }
        </>
    );
}

export default ClassPlanMultiSteps;
