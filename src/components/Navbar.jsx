import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated, userRole, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/')
    }

    return (
        <div className="navbar bg-primary shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">ScholarMatch</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Beranda</Link></li>
                    {isAuthenticated && userRole === 'user' && (
                        <li><Link to="/list-beasiswa">Beasiswa</Link></li>
                    )}
                    {isAuthenticated && userRole === 'admin' && (
                        <li><Link to="/beranda-admin">Admin</Link></li>
                    )}

                    {!isAuthenticated ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    ) : (
                        <li><button onClick={handleLogout}>Logout</button></li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar;