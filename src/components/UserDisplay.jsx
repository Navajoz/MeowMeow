import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../inf/firebaseconfig';
import { signOut } from 'firebase/auth';

const UserDisplay = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
      });
  };

  return (
    <div className="bg-dark text-light w-full p-8 pr-32">
      <div className='flex justify-between py-4'>
      <img src={currentUser.photoURL} alt="User Avatar" className="w-16 h-16 rounded-full" />
      <button 
        className="text-sm h-fit text-light border px-1 py-2 rounded"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
      </div>
      <h1 className="font-texto text-xl mt-2">Welcome, {currentUser.displayName}!</h1>
      <p className="text-medium">Email: {currentUser.email}</p>
    </div>
  );
};

export default UserDisplay;
