import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar'; // import sidebar

function DashboardAdmin() {
    const { beasiswaList } = useAuth();

    return (
        <div className="drawer lg:drawer-open">
            <input id="admin-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar mobile */}
                <div className="w-full navbar bg-base-100 lg:hidden">
                    <label htmlFor="admin-sidebar" className="btn btn-primary drawer-button">☰</label>
                    <div className="ml-4 text-xl font-bold">Dashboard Admin</div>
                </div>

                {/* Main Content */}
                <div className="px-4 py-8 bg-base-100 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary mb-8">
                            Selamat Datang, Admin!
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white shadow-md border border-base-200 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-primary mb-2">Total Beasiswa</h2>
                                <p className="text-4xl font-extrabold">{beasiswaList.length}</p>
                            </div>

                            <div className="bg-white shadow-md border border-base-200 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-primary mb-2">Beasiswa Aktif</h2>
                                <p className="text-2xl font-bold text-green-600">
                                    {
                                        beasiswaList.filter(b => new Date(b.deadline) > new Date()).length
                                    }
                                </p>
                            </div>

                            <div className="bg-white shadow-md border border-base-200 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-primary mb-2">Beasiswa Expired</h2>
                                <p className="text-2xl font-bold text-red-600">
                                    {
                                        beasiswaList.filter(b => new Date(b.deadline) <= new Date()).length
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 text-center">
                            <Link to="/kelola-beasiswa" className="btn btn-primary">
                                Kelola Beasiswa Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar (imported) */}
            <AdminSidebar />
        </div>
    );
}

export default DashboardAdmin;
