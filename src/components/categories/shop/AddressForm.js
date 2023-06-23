import React from 'react';
import { AddressElement } from '@stripe/react-stripe-js';

export default function AddressForm() {
  return (
    <div className="container-center">
      <form>
        <h3>Shipping</h3>
        <AddressElement options={{ mode: 'shipping' }} />
      </form>
    </div>
  );
}
