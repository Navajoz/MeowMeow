import React, { useState } from 'react';
import { auth } from '../inf/firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in:', user);
        setEmail('')
        setPassword('')
        navigate('/app')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);

      });
  };

  return (
    <div className="bg-dark min-h-screen flex flex-col items-center justify-center text-light">
      <h2 className="text-4xl font-semibold mb-6">Login to Your Account:</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="w-64 text-black">
        <div className="mb-4">
          <label htmlFor="email" className="text-lg font-medium block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-lg font-medium block">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-400 px-4 py-2 rounded-lg focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="w-full py-2 border border-light px-4 rounded-lg text-white font-semibold focus:outline-none"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
