import type { APIContext } from "astro";
import paypal from "@paypal/checkout-server-sdk";
import { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from "@src/utils";
import { db, eq, User } from "astro:db";
import { Pay } from "@/services/pay.services";

export async function POST(context: APIContext): Promise<Response> {
    const user = context.locals.user
    if (!user) {
        return new Response("Unauthorized", { status: 401 })
    }
    const balance = user.balance;
    const body = await context.request.json();
    const { orderId } = body;
    console.log("Esta es la peticion del CLiente", orderId)
    if (!orderId) {
        return new Response("Pedido no encontrado.", { status: 404 });
    }
    
    const environment = new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET)
    const client = new paypal.core.PayPalHttpClient(environment)

    try {
        const response = await client.execute(new paypal.orders.OrdersGetRequest(orderId));
        if (response.statusCode !== 200) {
            return new Response("Error al recuperar el pedido de PayPal", { status: 500 });
        }

        const orderDetails = response.result;
        const amount = orderDetails.purchase_units[0].amount.value;
        const request = new paypal.orders.OrdersCreateRequest();

        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: amount,
                    },
                    description: 'Recarga de saldo',
                }
            ]
        })
        if (isNaN(amount) || amount <= 0) {
            return new Response("Monto inválido.", { status: 400 });
        }
        const paypalresponse = await client.execute(request);
        const dbQuery = await Pay.createTransaction(user.id, amount, "Paypal", paypalresponse.result.id, paypalresponse.result.create_time);
        if (!dbQuery) {
            console.log("Error al actualizar el saldo.");
            return new Response("Error al actualizar el saldo.", { status: 500 });
        }
        return new Response(JSON.stringify({ id: paypalresponse.result.id }));
    } catch (error) {
        console.error(error);
        return new Response("Error interno del servidor.", { status: 500 });
    }
}