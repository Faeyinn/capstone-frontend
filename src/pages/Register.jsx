import { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, userRole } = useAuth(); // Ambil isAuthenticated dan userRole

    useEffect(() => {
        if (isAuthenticated) { // Jika sudah terautentikasi
            if (userRole === 'admin') {
                navigate('/beranda-admin', { replace: true }); // Redirect ke admin, replace history
            } else if (userRole === 'user') {
                navigate('/list-beasiswa', { replace: true }); // Redirect ke list beasiswa, replace history
            }
        }
    }, [isAuthenticated, userRole, navigate]); // Dependensi useEffect

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Password dan konfirmasi password tidak cocok.');
            return;
        }

        alert('Pendaftaran berhasil! Anda bisa mencoba login dengan akun demo.');
        navigate('/login');
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
                        <form onSubmit={handleRegister} className="card-body">
                            <h2 className="text-3xl text-center font-bold text-primary mb-4">Register</h2>
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
            <Footer />
        </div>
    );
}

export default Register;