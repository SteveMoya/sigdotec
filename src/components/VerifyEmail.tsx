 
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
    email: any;
}

export default function VerifyEmail({ email }: Props) {
    // Cambia el estado inicial de 'send' a false
    const [send, setSend] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!send) { // Verifica si el formulario aún no ha sido enviado
            setSend(false); // Asegúrate de que 'setSend' esté configurado correctamente aquí
            setLoading(true);
            try {
                const res = await fetch("", {
                    method: "POST",
                });
                setSend(true); // Establece 'send' como verdadero después del éxito
                if (res.ok){
                    toast.success(res.statusText);
                }
                if (!res.ok){
                    toast.error(res.statusText);
                }
            } catch (error) {
                console.error("Error sending verification link. Please try again.", error);
                toast("Error sending verification link. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            toast("El enlace de verificación ya ha sido enviado."); // Muestra un mensaje si el formulario ya ha sido enviado
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Verifica tu Email</CardTitle>
                <CardDescription>Haz click en tu email para recibir un magic link para verificar tu correo electronico.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email:
                                {email ? (
                                    <p className="">{email}</p>
                                ) : (
                                    <p className="text-gray-600">No email provided</p>
                                )}
                            </Label>
                        </div>
                    </div>
                    {
                        send && (
                            <p className="text-sm text-gray-600 mt-2">
                                Si no ves el email, verifica otros lugares donde podría estar, como tu carpeta de spam, redes sociales u otras carpetas similares.
                            </p>
                        )
                    }
                    <Button type="submit" className="mt-4" disabled={loading || send}> {/* Deshabilita el botón si 'loading' es true o si 'send' es true */}
                        {loading ? "Enviando..." : "Enviar enlace de verificación" || "Enviado"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
