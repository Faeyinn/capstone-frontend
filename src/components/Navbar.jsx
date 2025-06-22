import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth(); // Dapatkan status dari konteks

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">Scholarship Finder</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/scholarships">Beasiswa</Link></li>
            {/* Tautan Admin Dashboard hanya ditampilkan jika user adalah admin */}
            {isAdmin && (
              <li><Link to="/admin">Admin Dashboard</Link></li>
            )}
            {/* Tautan Login/Register atau Logout ditampilkan berdasarkan status autentikasi */}
            {isAuthenticated ? (
              <li><button onClick={logout} className="btn btn-ghost">Logout</button></li>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;