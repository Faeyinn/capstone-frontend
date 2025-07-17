import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import PageTransition from '../components/PageTransition'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Format email tidak valid.');
            return;
        }

        if (password.length < 4) {
            setError('Password minimal 4 karakter.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Password dan konfirmasi password tidak cocok.');
            return;
        }

        const registerSuccess = await register(email, password);
        if (registerSuccess) {
            Swal.fire({
                title: "Selamat !",
                text: "Registrasi berhasil, silahkan login !",
                icon: "success"
            });
            navigate('/login');
        } else {
            setError('Registrasi gagal. Email mungkin sudah digunakan.');
        }
    };

    return (
        <PageTransition>
            <div className="hero min-h-screen">
                <div className="hero-content text-neutral-content">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
                        <form onSubmit={handleRegister} className="card-body">
                            <h2 className="text-3xl font-bold text-center text-primary mb-2">Register</h2>
                            <h3 className="text-xl font-serif text-primary text-center mb-4">ScholarMatch</h3>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered bg-white text-black border-gray-300"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered bg-white text-black border-gray-300"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Konfirmasi Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="konfirmasi password"
                                    className="input input-bordered bg-white text-black border-gray-300"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary w-full">Daftar</button>
                            </div>
                            <p className="text-center text-black mt-4">
                                Sudah punya akun? <Link to="/login" className="link link-hover text-blue-500">Login di sini</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

export default Register;