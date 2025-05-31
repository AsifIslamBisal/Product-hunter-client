import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutFrom = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const membershipFee = 9.99;

  
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/subscription-status/${user.email}`)
        .then(res => {
          setIsSubscribed(res.data?.subscribed === true);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  
  useEffect(() => {
    axiosSecure.post('/create-payment', { price: membershipFee })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.log('Confirm error', confirmError);
    } else if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        price: membershipFee,
        transactionId: paymentIntent.id,
        date: new Date(),
        status: 'verified',
        membership: true
      };

      const res = await axiosSecure.post('/payments', payment);

      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          icon: 'success',
          title: `Payment Successful`,
          text: `Welcome, ${user.displayName}!`,
          showConfirmButton: true
        }).then(() => {
          navigate('/dashboard/PaymentHistory');
        });
      }
    }
  };

  if (loading) return <span className="loading loading-dots loading-lg"></span>;

  return (
    <div>
      {isSubscribed ? (
        <div className="text-green-600 font-bold text-lg">
          Status: Verified
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146' },
              },
            }}
          />
          <button
            className="btn btn-sm btn-primary my-4"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay ${membershipFee.toFixed(2)} for Membership
          </button>
          <p className="text-red-600">{error}</p>
          {transactionId && (
            <p className="text-green-600">
              Your transaction ID: {transactionId}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default CheckoutFrom;
