import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
// No longer need './Pages.css'

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      const response = await loginUser(email, password);
      onLoginSuccess(response.token, response.user.role);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center text-soft-blue-darker mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-soft-blue-medium rounded-md shadow-sm focus:ring-soft-blue-dark focus:border-soft-blue-dark sm:text-sm bg-soft-blue-lightest"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-soft-blue-medium rounded-md shadow-sm focus:ring-soft-blue-dark focus:border-soft-blue-dark sm:text-sm bg-soft-blue-lightest"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-soft-blue-dark hover:bg-soft-blue-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-soft-blue-dark transition duration-300"
          >
            Login
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-soft-blue-dark hover:text-soft-blue-darker">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;