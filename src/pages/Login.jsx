import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import PageTransition from '../components/PageTransition';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, isAuthenticated, userRole } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            if (userRole === 'admin') {
                navigate('/beranda-admin', { replace: true });
            } else if (userRole === 'user') {
                navigate('/list-beasiswa', { replace: true });
            }
        }
    }, [isAuthenticated, userRole, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const loginSuccess = await login(email, password);

        if (!loginSuccess) {
            setError('Email atau password salah.');
        } else {
            Swal.fire({
                title: 'Selamat!',
                text: 'Kamu berhasil login!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        }
    };

    return (
        <PageTransition>
            <div className="hero min-h-screen">
                <div className="hero-content text-neutral-content">
                    <div className="card w-full max-w-sm shadow-2xl bg-white">
                        <form onSubmit={handleSubmit} className="card-body">
                            <h2 className="text-3xl font-bold text-center text-primary mb-2">Login</h2>
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
                                <label className="label">
                                    <span className="label-text-alt link link-hover text-black">Lupa password?</span>
                                </label>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                            )}

                            <div className="form-control mt-4">
                                <button type="submit" className="btn btn-primary w-full">
                                    Login
                                </button>
                            </div>

                            <p className="text-center text-black mt-4 text-sm">
                                Belum punya akun?{' '}
                                <Link to="/register" className="link text-blue-500 font-medium">
                                    Daftar di sini
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

export default Login;
