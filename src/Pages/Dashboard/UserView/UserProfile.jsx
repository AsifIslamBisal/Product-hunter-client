import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFrom from '../Payment/CheckoutFrom';

const UserProfile = () => {
    const {user} = useAuth();
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
    return (
        <div>
          <div className='text-2xl'>
      <h2>
        <span>Hi, Welcome </span><br />
        
          { 
          user?.displayName ? user.displayName : 'back'
        }
        
      </h2>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutFrom></CheckoutFrom>
        </Elements>
      </div>
    </div>
    );
};

export default UserProfile;