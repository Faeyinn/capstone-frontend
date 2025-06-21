// src/pages/Login.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // 'user' or 'admin'
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement actual authentication logic here
        // For demonstration purposes:
        if (email === 'admin@example.com' && password === 'admin123' && role === 'admin') {
            console.log('Admin Login Successful');
            // In a real app, store token/session
            navigate('/admin'); // Redirect to admin dashboard
        } else if (email === 'user@example.com' && password === 'user123' && role === 'user') {
            console.log('User Login Successful');
            // In a real app, store token/session
            navigate('/'); // Redirect to homepage or user dashboard
        } else {
            alert('Email, password, atau peran tidak sesuai.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="card w-full max-w-md bg-white shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-bold text-center text-primary mb-6">Login to ScholarMatch</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="your_email@example.com"
                                    className="input input-bordered w-full text-base-100 bg-gray-200 shadow-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="input input-bordered w-full text-base-100 bg-gray-200 shadow-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text">Login Sebagai</span>
                                </label>
                                <select
                                    className="select select-bordered w-full text-base-100 bg-gray-200 shadow-sm"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary w-full">Login</button>
                            </div>
                        </form>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Belum punya akun? <Link to="/register" className="link link-primary">Daftar Sekarang</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;