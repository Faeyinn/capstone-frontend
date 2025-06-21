// src/pages/Register.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Password dan Konfirmasi Password tidak cocok!');
            return;
        }

        // --- Implementasi Logika Pendaftaran Pengguna (Backend Integration) ---
        // Di sini Anda akan mengirim data pendaftaran (nama, email, password) ke API backend Anda.
        // Contoh placeholder:
        console.log('Mencoba mendaftar dengan:', { name, email, password });

        // Simulasikan pendaftaran berhasil
        setTimeout(() => {
            alert('Pendaftaran berhasil! Silakan login.');
            navigate('/login'); // Arahkan ke halaman login setelah pendaftaran berhasil
        }, 1000);

        // Jika Anda memiliki backend, kodenya akan terlihat seperti ini:
        /*
        fetch('/api/register', { // Ganti dengan URL API backend Anda
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Pendaftaran berhasil! Silakan login.');
                navigate('/login');
            } else {
                alert('Pendaftaran gagal: ' + (data.message || 'Terjadi kesalahan.'));
            }
        })
        .catch(error => {
            console.error('Error saat pendaftaran:', error);
            alert('Terjadi kesalahan saat pendaftaran. Silakan coba lagi.');
        });
        */
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="card w-full max-w-md bg-white shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-bold text-center text-primary mb-6">Daftar Akun Baru</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Nama Lengkap</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nama Lengkap Anda"
                                    className="input input-bordered w-full text-base-100 bg-gray-200 shadow-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
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
                                    <span className="label-text">Konfirmasi Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="input input-bordered w-full text-base-100 bg-gray-200 shadow-sm"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary w-full">Daftar</button>
                            </div>
                        </form>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Sudah punya akun? <Link to="/login" className="link link-primary">Login Sekarang</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;