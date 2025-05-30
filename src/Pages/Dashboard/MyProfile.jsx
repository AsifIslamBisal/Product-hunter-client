import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { CheckmarkIcon } from 'react-hot-toast';
import CheckoutForm from './Payment/CheckoutFrom';

const stripePromise = loadStripe('your_publishable_key_here'); // তোমার stripe পাবলিশেবল কী বসাও

const MyProfile = () => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ইউজার ডেটা লোড করা
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axiosPublic.get('/users/me');
      setUser(res.data);
    } catch (error) {
      console.error('User load error:', error);
    }
  };

  fetchUser();
}, []);

  // পেমেন্ট সফল হলে কলব্যাক
  const handlePaymentSuccess = () => {
    // লোকাল ইউজার অবজেক্টে isSubscribed আপডেট করো
    setUser((prev) => ({ ...prev, isSubscribed: true }));
    setShowModal(false); // মডাল বন্ধ করো
  };

  if (!user) {
    return <p className="text-center mt-10">লোড হচ্ছে...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10 text-center">
      <img src={user.image} alt="User" className="w-24 h-24 rounded-full mx-auto" />
      <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>

      {!user.isSubscribed ? (
        <button
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Subscribe $5
        </button>
      ) : (
        <p className="mt-4 text-green-600 font-semibold">Status: Verified</p>
      )}

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={5} onPaymentSuccess={handlePaymentSuccess} ></CheckoutForm>
            </Elements>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              aria-label="Close modal"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
