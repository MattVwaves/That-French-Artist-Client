import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import AddressForm from './AddressForm';
import { Elements } from '@stripe/react-stripe-js';

export default function Payment({ basketList }) {
  const apiUrl = 'http://localhost:4000';
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [address, setAddress] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/config`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/create-payment-intent`, {
      method: 'POST',
      body: JSON.stringify({}),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
    });
  }, []);

  const handleCheckout = async () => {
    const country = address.address.country;
    let shippingCost = 3.45;
    if (country !== 'GB') shippingCost = 7.2;
    const newBasket = basketList.map((item) => {
      return { ...item, price: item.price.slice(1) };
    });
    await fetch(`${apiUrl}/checkout`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ newBasket, shippingCost }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
          console.log(response.url);
        }
      });
  };

  return (
    <>
      <h1>Payment</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <AddressForm
            handleCheckout={handleCheckout}
            setAddress={setAddress}
          />
          {/* <CheckoutForm /> */}
        </Elements>
      )}
    </>
  );
}
