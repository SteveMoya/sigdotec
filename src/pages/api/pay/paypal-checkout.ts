// import type { APIRoute } from "astro";
// import paypal from "@paypal/checkout-server-sdk";
// import { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from "@src/utils";

// export const POST: APIRoute = async () => {
//     const environment = new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET)
//     const client = new paypal.core.PayPalHttpClient(environment)

//     // const { amount } = await request.json()
//     const createRequest = new paypal.orders.OrdersCreateRequest()
//     createRequest.prefer("return=representation")
//     createRequest.requestBody({
//         intent: "CAPTURE",
//         purchase_units: [{
//             amount: {
//                 currency_code: "USD",
//                 value: "100.00",
//                 breakdown: {
//                     item_total: {
//                         currency_code: "USD",
//                         value: "100.00"
//                     },
//                 }
//             },
//             items: [
//                 {
//                     name: "item",
//                     quantity: "1",
//                     description: "Plan de Clases",
//                     unit_amount: {
//                         currency_code: "USD",
//                         value: "50.00"
//                         // value: amount
//                     },
//                     category: "DIGITAL_GOODS"
//                 },
//                 {
//                     name: "item",
//                     quantity: "1",
//                     description: "Plan de Unidad",
//                     unit_amount: {
//                         currency_code: "USD",
//                         value: "50.00"
//                         // value: amount
//                     },
//                     category: "DIGITAL_GOODS"
//                 }
//             ],
//         },
//         ]
//     })
//     try {
//         const response = await client.execute(createRequest)
//         console.log(response.result)
//         return new Response(JSON.stringify({ id: response.result.id }))
//     } catch (error) {
//         console.error(error)
//         return new Response("Error", { status: 500 })
//     }

// }