import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
// No longer need './Pages.css'

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      const response = await registerUser(name, email, password, role);
      setMessage(response.message);
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.error || error.message || 'Registration failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center text-soft-blue-darker mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-soft-blue-medium rounded-md shadow-sm focus:ring-soft-blue-dark focus:border-soft-blue-dark sm:text-sm bg-soft-blue-lightest"
            />
          </div>
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
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-soft-blue-medium rounded-md shadow-sm focus:ring-soft-blue-dark focus:border-soft-blue-dark sm:text-sm bg-soft-blue-lightest"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-soft-blue-dark hover:bg-soft-blue-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-soft-blue-dark transition duration-300"
          >
            Register
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-soft-blue-dark hover:text-soft-blue-darker">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;