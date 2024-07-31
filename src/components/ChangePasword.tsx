// "use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useFetch } from '@hooks/useFetch';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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


import { ChangePasswordSchema } from "@/schemas/authentification"
import { toast } from "sonner"
import { useState } from "react";
import { Label } from "./ui/label";

export function ChangePasword() {
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            lastPassword: "",
            newPassword: "",
            confirmPassword: "",
            logoutFromOtherDevices: false
        },
    })

    async function onSubmit() {
        setOpen(true)
    }
    async function onConfirm() {
        try {
            const values = form.getValues()

            const res = await fetch("/app/perfil", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            const data = await res.json()
            console.log(res)
            if (res.ok) {
                toast.success(data.message)
            }
            if (!res.ok) {
                toast.error(data.error)
            }
            // recargamos la pagina aqui
            window.location.reload()
        } catch (error) {
            console.log(error)
            toast.error("Ha ocurrido un error.")
        }
    }
    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cambiar Contraseña</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estas seguro que deseas cambiar tu contraseña?, Si continuas se cerrara la sesión de todos los dispositivos.
                            <div className="flex items-center space-x-2 my-4">
                                <Checkbox onCheckedChange={(value: boolean) => {
                                    form.setValue("logoutFromOtherDevices", value)
                                }} id="close-seccion" />
                                <label
                                    htmlFor="close-seccion"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Cerrar sesión de otros dispositivos
                                </label>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="lastPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña Anterior</FormLabel>
                                <FormControl>
                                    <Input placeholder="*******" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña Nueva</FormLabel>
                                <FormControl>
                                    <Input placeholder="*******" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confimar Nueva Contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="*******" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white dark:hover:text-white">Guardar</Button>
                </form>
            </Form>
        </>
    )
}


