import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar bg-primary shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">ScholarMatch</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Beranda</Link></li>
                    <li><Link to="/list-beasiswa">Beasiswa</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/beranda-admin">Admin</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;