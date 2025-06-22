import React from 'react';
import { Link } from 'react-router-dom';
// No longer need './Header.css'

const Header = ({ isAuthenticated, isAdmin, onLogout }) => {
  return (
    <header className="bg-soft-blue-medium text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold no-underline">ScholarMatch</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-white hover:text-soft-blue-light transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/scholarships" className="text-white hover:text-soft-blue-light transition duration-300">Scholarships</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/admin/scholarships" className="text-white hover:text-soft-blue-light transition duration-300">Admin</Link>
              </li>
            )}
            {isAuthenticated ? (
              <li>
                <button onClick={onLogout} className="bg-transparent border border-white text-white px-3 py-1 rounded-md hover:bg-white hover:text-soft-blue-medium transition duration-300">Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-soft-blue-light transition duration-300">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="text-white hover:text-soft-blue-light transition duration-300">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;