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


import { SignInSchema } from "@/schemas/authentification"
import { toast } from "sonner"

export function SignInForm() {
    
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof SignInSchema>) {
        try{
            
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            
            console.log(res)
            if (res.ok) {
                toast.success("You have successfully logged in.")
            } else {
                toast.error("Invalid credentials.")
            }
            if(res.redirected){
                window.location.href = res.url
            }
            
        } catch (error) {
            console.log(error)
            toast.error("An error occurred.")
        }
    }
    return (
        <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">Correo del Usuario</FormLabel>
                            <FormControl>
                                <Input placeholder="ejemplo@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />{" "}
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
                    <Button type="submit" className="w-full hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white dark:hover:text-white">Iniciar Sesión</Button>
            </form>
        </Form>
        </>
    )
}


