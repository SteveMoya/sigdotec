// "use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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


import { ResetPasswordSchema } from "@/schemas/authentification"
import { toast } from "sonner"
import { useState } from "react"

export function ResetPasswordForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
        if (isSubmitted) return
        try {

            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            console.log("Respuesta del servidor", res)
            if (res.ok) {
                toast.success("Correo de restablecimiento de contraseña enviado exitosamente. Verifica tu bandeja de entrada.")
                setIsSubmitted(true)
            } else {
                toast.error("Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.")
            }
           
        } catch (error) {
            console.log(error)
            toast.error("Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.")
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    {
                        isSubmitted && (
                            <FormDescription>
                                Se ha enviado un correo electrónico con un enlace para restablecer tu contraseña. Si no ves el correo en tu bandeja de entrada, revisa la carpeta de spam.
                            </FormDescription>
                        )
                    }
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-lg">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tu correo electronico...
                                    " {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />{" "}
                    <Button type="submit" className="w-full hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white dark:hover:text-white" disabled={isSubmitted}>
                        Enviar 
                    </Button>
                </form>
            </Form>
        </>
    )
}


