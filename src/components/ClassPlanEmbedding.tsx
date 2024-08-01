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
import { ClassPlanEmbeddingFormSchema } from "@/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useFetch } from "@/hooks/useFetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loading } from "./App/Loading";
import { toast } from "sonner";
import DataDisplay from "./App/DataDisplay";
import { DownloadDOC, DownloadPDF } from "./App/DownloadButtons";
import { Input } from "./ui/input";

function ClassPlanEmbedding() {
    const { data, isLoading, error, fetchData } = useFetch();
    const { data: data2, error: error2, fetchData: fetchData2 } = useFetch();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showDownloadButtons, setShowDownloadButtons] = useState(false);
    const [timer, setTimer] = useState(0);
    const [showPostTimerMessage, setShowPostTimerMessage] = useState(false);

    useEffect(() => {
        fetchData2(`/api/ai/alltopic`, 'GET');
    }, []);

    const form = useForm<z.infer<typeof ClassPlanEmbeddingFormSchema>>({
        resolver: zodResolver(ClassPlanEmbeddingFormSchema),
        defaultValues: {
            materia: "",
            grado: "",
            texto: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ClassPlanEmbeddingFormSchema>) => {
        setIsSubmitted(true);
        fetchData(`/api/ai/classPlanEmbedding`, 'POST', values);
    };

    useEffect(() => {
        if (error) toast.error(`Error: ${error}`);
        if (data) {
            setShowDownloadButtons(true);
            setTimer(180);  // 180 seconds for 3 minutes
            toast.success('Plan de unidad generado correctamente');
        }
        if (isLoading) toast.loading('Cargando Plan');
        return () => {
            toast.dismiss();
        };
    }, [data, error, isLoading]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0 && showDownloadButtons) {
            setShowDownloadButtons(false);
            setShowPostTimerMessage(true);
        }
        return () => clearInterval(interval);
    }, [timer, showDownloadButtons]);

    const selectedMateria = form.watch("materia");
    const selectedGrado = form.watch("grado");

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
                    <CardTitle>Habla con tu Plan de Clase</CardTitle>
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
                                name="texto"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Texto</FormLabel>
                                        <FormControl>
                                            <Input disabled={!selectedGrado} placeholder="Detalla algunas ideas principales de tu plan ideal aquí" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full dark:bg-primary-800 dark:text-white mt-4 dark:hover:bg-primary-900" disabled={isLoading || isSubmitted}>
                                {isLoading ? 'Cargando...' : 'Planificar'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            {isLoading && <Loading />}
            {data &&
                <>
                    <article className='mx-0 text-center p-7 grid sm:grid-cols-2 grid-cols-1 gap-4'>
                        <DataDisplay data={memoizedData} />
                    </article>
                    {showDownloadButtons && (
                        <div className="flex justify-center items-center">
                            <DownloadDOC />
                        </div>
                    )}
                    {timer > 0 ? (
                        <p className="text-center mt-4">
                            Descarga tu archivo en menos de {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')} minutos o ve a tus planes.
                        </p>
                    ) : (
                        showPostTimerMessage && (
                            <p className="text-center mt-4">
                                El tiempo de descarga ha expirado. Por favor, ve a tus planes para descargar tu archivo.
                            </p>
                        )
                    )}
                </>
            }
        </>
    );
}

export default ClassPlanEmbedding;
