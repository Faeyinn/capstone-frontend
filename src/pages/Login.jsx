import { useState, useEffect } from 'react'; // Import useEffect
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, isAuthenticated, userRole } = useAuth(); // Ambil isAuthenticated dan userRole

    useEffect(() => {
        if (isAuthenticated) { // Jika sudah terautentikasi
            if (userRole === 'admin') {
                navigate('/beranda-admin', { replace: true }); // Redirect ke admin, replace history
            } else if (userRole === 'user') {
                navigate('/list-beasiswa', { replace: true }); // Redirect ke list beasiswa, replace history
            }
        }
    }, [isAuthenticated, userRole, navigate]); // Dependensi useEffect

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const loginSuccess = login(email, password);

        if (!loginSuccess) { // Hanya set error jika login gagal
            setError('Email atau password salah.');
        }
    };

    return (
        <div>
            <Navbar />
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://ik.imagekit.io/xf0h05qpxc/Unand.jpg?updatedAt=1750638177955)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
                        <form onSubmit={handleSubmit} className="card-body">
                            <h2 className="text-3xl text-center font-bold text-primary mb-4">Login</h2>
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
                                    <a href="#" className="label-text-alt link link-hover text-black">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary w-full">Login</button>
                            </div>
                            <p className="text-center text-black mt-4">
                                Belum punya akun? <Link to="/register" className="link link-hover text-blue-500">Daftar di sini</Link>
                            </p>
                            <p className="text-center text-black mt-2">
                                <span className="font-bold">Demo Akun:</span>
                                <br />
                                Admin: admin@example.com / adminpassword
                                <br />
                                User: user@example.com / userpassword
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;