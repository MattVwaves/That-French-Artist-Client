import React from 'react';
import { AddressElement } from '@stripe/react-stripe-js';

export default function AddressForm({ handleCheckout, setAddress }) {
  const handleAddress = (e) => {
    setAddress(e.value);
  };

  return (
    <div className="container-center">
      <form>
        <h3>Shipping</h3>
        <AddressElement
          options={{ mode: 'shipping' }}
          onChange={handleAddress}
        />
      </form>
      <button onClick={() => handleCheckout()}>Pay</button>
    </div>
  );
}
