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
import { RecoverNewPasswordSchema } from "@/schemas/authentification"
import { toast } from "sonner"

interface Props {
    token: string;
}
export function ForgotPasswordForm({ token }: Props) {
    const form = useForm<z.infer<typeof RecoverNewPasswordSchema>>({
        resolver: zodResolver(RecoverNewPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    })
   
    async function onSubmit(values: z.infer<typeof RecoverNewPasswordSchema>) {
        console.log("onSubmit called");
        console.log("Este es el token", token);
        console.log(values);
        const requestValues = {
            token: token,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        }
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json",
                },
                // mandamos los valores del formulario y el token
                body: JSON.stringify(requestValues),
            })
            const data = await res.json()
            console.log(res)
            if (res.ok) {
                console.log(data.message)
                toast.success(data.message)
                windows.reload()
            }
            if (!res.ok) {
                console.log(data.error)
                toast.error(data.error)
            }
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
                <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))} className="space-y-2">
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
                    <Button type="submit" className="w-full hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white dark:hover:text-white">Cambiar Contraseña</Button>
                </form>
            </Form>
        </>
    )
}


