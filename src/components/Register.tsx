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
import { Checkbox } from "@/components/ui/checkbox"

import { SignUpSchema } from "@/schemas/authentification"
import { toast } from "sonner"

export function SignUpForm() {

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        },
    })

    async function onSubmit(values: z.infer<typeof SignUpSchema>) {
        try {

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                
            })

            console.log(res)
            if (res.ok) {
                toast.success("Usuario creado exitosamente")
            } else {
                toast.error("Credenciales Invitalidas.")
            }
            if(res.redirected){
                window.location.href = res.url
            }

        } catch (error) {
            console.log(error)
            toast.error("Error al Crear el usuario.")
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-lg">Nombre de Usuario</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tu nombre aqui" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />{" "}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-lg">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="ejemplo@gmail.com" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-lg">Contraseña</FormLabel>
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
                                <FormLabel className="font-semibold text-lg">Confirmar Contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="*******" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="acceptTerms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                <FormControl>
                                    <Checkbox
                                        onCheckedChange={(value: boolean) => form.setValue("acceptTerms", value)}
                                        id="accept-terms"
                                        checked={field.value}
                                        className="dark:checked:bg-primary-800 dark:checked:border-primary-800 dark:checked:text-white"
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Acepto los{" "}
                                        <a href="/terminos-y-condiciones" className="text-primary-600 dark:text-primary-800 underline">
                                            términos y condiciones
                                        </a>
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white dark:hover:text-white">Registrarse</Button>
                </form>
            </Form>
        </>
    )
}


