import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useFetch } from '@src/hooks/useFetch';
import { PUBLIC_PAYPAL_CLIENT_ID } from '@src/utils';


export const PaypalButtom = () => {

  return (
    <PayPalScriptProvider options={{ clientId: PUBLIC_PAYPAL_CLIENT_ID }}>
      <PayPalButtons style={{ color: "blue" }} className='w-[400px] bg-white p-10 rounded-md'
        createOrder={async () => {
          const res = await fetch('/api/pay/paypal-checkout', {
            method: 'POST',
            // body: JSON.stringify({ amount: 1000 }),
            // headers: {
            //   'Content-Type': 'application/json'
            // }
          });
          const order = await res.json();
          console.log(order);
          return order.id;
        }}
        onApprove={async (data, actions) => {
          console.log(data);
          await actions.order.capture();
        }}
      onCancel={async() => {
        console.log('Orden Cancelada')
      }} 
      />
    </PayPalScriptProvider>
  )
}
