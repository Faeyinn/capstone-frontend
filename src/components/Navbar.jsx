import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function SidebarAdmin() {
  const { isAuthenticated, userRole, logout } = useAuth();
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
    <div className="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-primary text-white px-4">
          {/* Sidebar Toggle (Mobile) */}
          <div className="flex-none md:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>

          {/* Logo */}
          <div className="flex-1 font-bold text-xl font-serif">
            <Link to="/">ScholarMatch</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="btn btn-ghost btn-sm">Beranda</Link>

            {isAuthenticated && userRole === 'user' && (
              <Link to="/list-beasiswa" className="btn btn-ghost btn-sm">Beasiswa</Link>
            )}
            {isAuthenticated && userRole === 'admin' && (
              <Link to="/beranda-admin" className="btn btn-ghost btn-sm">Admin</Link>
            )}

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link to="/register" className="btn btn-ghost btn-sm">Register</Link>
              </>
            ) : (
              <Menu as="div" className="relative">
                <MenuButton className="btn btn-ghost btn-sm flex items-center gap-1">
                  <span>Hello</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg ring-1 ring-black/5 z-10">
                  <MenuItem>
                    <Link to="/account-setting" className="block px-4 py-2 hover:bg-gray-100">
                      Account Settings
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
          {/* Auth-based menu */}
          {!isAuthenticated ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/account-setting">Account Settings</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}

          <li><Link to="/">Beranda</Link></li>

          {isAuthenticated && userRole === 'user' && (
            <>
              <li><Link to="/list-beasiswa">List Beasiswa</Link></li>
              <li><Link to="/list-bookmark">List Bookmark</Link></li>
            </>
          )}

          {isAuthenticated && userRole === 'admin' && (
            <>
              <li><Link to="/beranda-admin">List Beasiswa</Link></li>
              <li><Link to="/add-beasiswa">Tambah Beasiswa</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SidebarAdmin;
