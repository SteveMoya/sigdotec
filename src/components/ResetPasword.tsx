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

export function ResetPasswordForm() {

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
        try {

            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: JSON.stringify(values),
            })

            console.log(res)
            if (res.ok) {
                toast.success("Email sent with instructions to reset your password")
            } else {
                toast.error("An error occurred.")
            }
            // window.location.reload()

        } catch (error) {
            console.log(error)
            toast.error("An error occurred.")
        }
        finally {
            form.reset()
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <h1 className="text-2xl text-center font-semibold"> Recuperar contraseña
                    </h1>
                        <FormDescription>
                            Escrite tu correo electronico y te enviaremos un enlace para restablecer tu contraseña.
                        </FormDescription>
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
                    <Button type="submit" className="w-full hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white dark:hover:text-white">
                        Enviar 
                    </Button>
                </form>
            </Form>
        </>
    )
}


