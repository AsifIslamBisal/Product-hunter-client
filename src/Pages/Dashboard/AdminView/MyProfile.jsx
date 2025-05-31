import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const MyProfile = () => {
  const {user} = useAuth();
  return (
    <div className='text-3xl'>
      <h2>
        <span>Hi, Welcome </span>
        {
          user?.displayName ? user.displayName : 'back'
        }
      </h2>
    </div>
  );
};

export default MyProfile;