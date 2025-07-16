import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

function AdminSidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        Swal.fire({
            title: 'Success!',
            text: 'Kamu berhasil logout',
            icon: 'success',
        });
    };

    return (
        <div className="drawer-side">
            <label htmlFor="admin-sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
                <li className="mb-4 text-xl font-bold text-primary">Admin Panel</li>
                <li><Link to="/beranda-admin">🏠 Dashboard</Link></li>
                <li><Link to="/kelola-beasiswa">🎓 Kelola Beasiswa</Link></li>
                <li><Link to="/kelola-user">👥 Kelola Pengguna</Link></li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left"
                    >
                        🚪 Logout
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default AdminSidebar;
