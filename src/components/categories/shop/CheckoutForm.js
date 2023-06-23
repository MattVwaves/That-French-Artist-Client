import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment Status: ' + paymentIntent.status);
    } else {
      setMessage('Unexpected state');
    }

    setIsProcessing(false);
  };

  return (
    <div className="container-center">
      <form id="payment-form" onSubmit={handleSubmit}>
        <span>Subtotal: £27.00</span>
        <span>shipping: £27.00</span>
        <span>total: £27.00</span>

        <PaymentElement />
        <button disabled={isProcessing} id="submit">
          <span id="button-text">
            {isProcessing ? 'Processing ... ' : 'Pay £27.00 now'}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
