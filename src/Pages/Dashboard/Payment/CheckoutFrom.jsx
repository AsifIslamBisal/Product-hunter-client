import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';

const CheckoutForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create payment intent');
        return res.json();
      })
      .then(data => setClientSecret(data.clientSecret))
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
      });
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      Swal.fire('Payment Failed', result.error.message, 'error');
      setLoading(false);
    } else if (result.paymentIntent?.status === 'succeeded') {
      Swal.fire('Success', 'Payment Successful!', 'success');
      onPaymentSuccess();
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-2 rounded" />
      <button
        type="submit"
        disabled={!stripe || loading || !clientSecret}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
