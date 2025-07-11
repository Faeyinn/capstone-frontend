import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function SidebarAdmin() {
    const { isAuthenticated, userRole, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/')
        Swal.fire({
            title: "Success!",
            text: "Kamu berhasil logout",
            icon: "success"
        });
    }

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-primary w-full">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <Link to="/" className="btn btn-ghost text-xl font-serif">ScholarMatch</Link>
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
                                <>
                                    <Menu as="div" className="ml-4 relative inline-block text-left">
                                        <div>
                                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-white-100 ring-1 ring-gray-300 ring-inset hover:cursor-pointer">
                                                <li>
                                                    Hello
                                                </li>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-white-400" />
                                            </MenuButton>
                                        </div>

                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                        >
                                            <div className="py-1">
                                                <MenuItem>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                                    >
                                                        Account settings
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button
                                                        onClick={handleLogout}
                                                        type="submit"
                                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:cursor-pointer"
                                                    >
                                                        Logout
                                                    </button>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    {!isAuthenticated ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    ) : (
                        <>
                            <Menu as="div" className="m-4 relative inline-block text-left">
                                <div>
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-white-100 ring-1 ring-gray-300 ring-inset hover:cursor-pointer">
                                        <li>
                                            Hello
                                        </li>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    <div className="py-1">
                                        <MenuItem>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                            >
                                                Account settings
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                onClick={handleLogout}
                                                type="submit"
                                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:cursor-pointer"
                                            >
                                                Logout
                                            </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                        </>
                    )}
                    <li><Link to="/">Beranda</Link></li>
                    {isAuthenticated && userRole === 'user' && (
                        <>
                        <li><Link to="/list-beasiswa">Daftar Beasiswa</Link></li>
                            <button onClick={handleLogout} className="btn btn-info m-4">Logout</button>
                        </>
                        
                    )}
                    {isAuthenticated && userRole === 'admin' && (
                        <>
                            <li><Link to="/beranda-admin">List Beasiswa</Link></li>
                            <li><Link to="/add-beasiswa">Tambah Beasiswa</Link></li>
                            <button onClick={handleLogout} className="btn btn-info m-4">Logout</button>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SidebarAdmin;