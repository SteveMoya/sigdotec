import { Button } from "@/components/ui/button"
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
import { EditUserSchema, roles } from "@/schemas";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react";

export const EditDemography = ({id}: {id: string}) => {
    const [open, setOpen] = useState(false)
    const form = useForm({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            role: "",
            balance: "",
            onConfirm: false,
        },
    });

    async function onConfirm() {
        try {
            const values = form.getValues()
            console.log("Valores",values)
            console.log("ID",id)
            const res = await fetch(`/api/auth/edit-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...values, id }),
            });
            if (!res.ok) toast.error("Error al editar el usuario");
            console.log("URL", res.url)
            form.reset()
            setOpen(false)
            toast.success("Usuario editado con exito")
        } catch (e) {
            console.log(e)
            toast.error("Error al editar el usuario")
        }
    }
    async function onSubmit() {
        setOpen(true)
    }
    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmacion de los datos</AlertDialogTitle>
                        <AlertDialogDescription>
                            Estos son los datos que ingresaste, ¿estas seguro de que son correctos?
                            <div className="flex items-center space-x-2 my-4 flex-col gap-2">
                                {/** Aqui mostramos todos los datos ingresados */}
                                <div className="grid grid-cols-2 gap-x-8 text-lg font-semibold capitalize">
                                    {Object.entries(form.getValues()).map(([key, value]) => {
                                        // Si key es 'onConfirm', no mostramos nada
                                        if (key === 'onConfirm') {
                                            return null;
                                        }
                                        // Formateamos el valor a mostrar
                                        let formattedValue = value;
                                        if (key === 'balance') {
                                            formattedValue = `$${value}`;
                                        }
                                        

                                        return (
                                            <>
                                                <span key={key} className="font-semibold">{key}:</span>
                                                <span>{formattedValue}</span>
                                            </>
                                        );
                                    })}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox onCheckedChange={(value: boolean) => {
                                        form.setValue("onConfirm", value)
                                    }} id="confirm" />
                                    <label
                                        htmlFor="confirm"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Aceptar los datos ingresados
                                    </label>
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Dialog>
                <DialogTrigger asChild >
                    <Button variant="outline" className=" inline-flex items-center bg-white border border-primary-300 focus:outline-none hover:bg-primary-100 focus:ring-4 focus:ring-primary-200 font-medium text-sm dark:bg-primary-700 text-white dark:hover:bg-primary-800 rounded-full p-3 "><span className="icon-[mdi--account-edit]"></span></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Editar Usuario</DialogTitle>
                        <DialogDescription>
                            Llena el formulario para editar un usuario
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="font-semibold text-lg">Rol del Usuario</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona el tipo de transaccion..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {roles.map((i) => (
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
                                name="balance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-lg">Balance (USD)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa el Monto aquí..."
                                                //Colocamos que el valor de este input se convierta a un numero
                                                {...field}
                                                type="number" min="0" max="500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full  hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white dark:hover:text-white mt-4">Confirmar</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}
