import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import { PaymetSchema } from "@/schemas/payment";
import { toast } from "sonner"

export function PaymentForm() {
    const form = useForm({
        resolver: zodResolver(PaymetSchema),
        defaultValues: {
            amount: 0
        },
    });

    async function handleCreateOrder(data: any, actions: any) {
        // Aquí solo necesitas devolver el ID del pedido creado por PayPal
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: form.getValues().amount
                    },
                    description: 'Recarga de saldo',
                }
            ]
        });
    }

    async function handleApprove(data: any, actions: any) {
        try {
            actions.order.capture(); 
            // Obtener el ID del pedido de la acción
            const orderId = data.orderID;
            const res = await fetch(`/api/pay/paypal-checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId }),
            });
            
            if (!res.ok) throw new Error('Error al procesar el pago');
            toast.success(`Pago procesado con éxito, Pago realizado`);
            window.location.reload();  
        } catch (error) {
            console.error(error);
            toast.error("Ocurrió un error al procesar el pago.");
        } 
    }

    return (
        <>
            <PayPalScriptProvider options={{ clientId: "AUqP-bbHL5KTxlzYPp1w_4wnDF730loIlB-wFIR5QJQVqawzsgdOEY8XXRpQReB1sWj59WXj-L_vTqYu" }}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => { }) /* Deshabilitar el envío del formulario */} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-lg">Monto a Recargar</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingresa el Monto aqui..." {...field} type="number" min="1" max="10000" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <PayPalButtons
                            style={{ color: "blue" }}
                            createOrder={handleCreateOrder}
                            onApprove={handleApprove}
                            onCancel={() => {
                                toast.info("Pago cancelado");
                            }}
                        />
                    </form>
                </Form>
            </PayPalScriptProvider>
        </>
    );
}
