import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface Props {
    email: any;
}

export default function VerifyEmail({ email }: Props) {
    const [send, setSend] = useState(false);
    const [loading, setLoading] = useState(false);
    const initialTimer = JSON.parse(localStorage.getItem('timer')) || 86400; // 86400 segundos son 24 horas
    const [timer, setTimer] = useState(initialTimer);

    useEffect(() => {
        localStorage.setItem('timer', JSON.stringify(timer));
    }, [timer]);

    useEffect(() => {
        let intervalId;
        if (send) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTimer = prevTimer - 1;
                    localStorage.setItem('timer', JSON.stringify(newTimer)); // Guardar el nuevo tiempo restante en localStorage
                    return newTimer;
                });
            }, 1000);
        }
        return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
    }, [send]);

    const handleSubmit = async () => {
        if (!send) {
            setSend(false);
            setLoading(true);
            try {
                const res = await fetch("", {
                    method: "POST",
                });
                console.log(res);
                if (res.ok) {
                    toast.success("Correo de verificación enviado exitosamente. Verifica tu bandeja de entrada.");
                } else {
                    toast.error("Error al enviar el enlace de verificación. Por favor, inténtalo de nuevo más tarde.");
                }
                setSend(true);
            } catch (error) {
                console.error("Error sending verification link. Please try again.", error);
                toast("Error sending verification link. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            toast("El enlace de verificación ya ha sido enviado.");
        }
    };

    return (
        <Card className="w-[350px] bg-slate-800 border  border-gray-700 shadow-2xl">
            <CardHeader>
                <CardTitle>Verifica tu Email</CardTitle>
                <CardDescription>Haz click en tu email para recibir un magic link para verificar tu correo electrónico.</CardDescription>
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
                            <div className="mt-2">
                                <p className="">Tiempo restante antes de que el correo expire:</p>
                                <p className="text-primary-700">{`${Math.floor(timer / 3600)}h ${Math.floor((timer % 3600) / 60)}m ${(timer % 60)}s`}</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Si no ves el email, verifica otros lugares donde podría estar, como tu carpeta de spam, redes sociales u otras carpetas similares.
                                </p>
                                
                            </div>
                        )
                    }
                    <Button type="submit" className="mt-4" disabled={loading || send || timer <= 0}>
                        {loading ? "Enviando..." : "Enviar enlace de verificación" || "Enviado"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
