import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import AdminSidebar from '../../components/AdminSidebar'
import PageTransition from '../../components/PageTransition'

function KelolaBeasiswa() {
    const navigate = useNavigate();
    const { beasiswaList, deleteBeasiswa } = useAuth();

    const handleDelete = async (beasiswaId) => {
        Swal.fire({
            title: "Anda yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteBeasiswa(beasiswaId);
                if (success) {
                    Swal.fire({
                        title: "Dihapus!",
                        text: "Beasiswa telah dihapus.",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Gagal!",
                        text: "Gagal menghapus beasiswa.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <PageTransition>
            <div className="drawer lg:drawer-open">
                <input id="admin-sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar for mobile */}
                    <div className="w-full navbar bg-base-100 lg:hidden">
                        <label htmlFor="admin-sidebar" className="btn btn-primary drawer-button">☰</label>
                        <div className="ml-4 text-xl font-bold">Admin Panel</div>
                    </div>

                    {/* Main content */}
                    <div className="px-4 py-8 bg-base-100 min-h-screen">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary mb-8">
                                Daftar Beasiswa
                            </h1>

                            <div className="flex justify-center mb-6">
                                <Link to="/add-beasiswa" className="btn btn-info">
                                    Tambah Beasiswa Baru
                                </Link>
                            </div>

                            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-base-200">
                                <table className="table w-full min-w-[600px] text-sm sm:text-base">
                                    <thead className="bg-primary text-white text-left">
                                        <tr>
                                            <th className="p-3">Nama Beasiswa</th>
                                            <th className="p-3">Penyedia</th>
                                            <th className="p-3">Deadline</th>
                                            <th className="p-3">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {beasiswaList.length > 0 ? (
                                            beasiswaList.map((beasiswa) => (
                                                <tr key={beasiswa.id} className="hover:bg-gray-100 text-gray-800">
                                                    <td className="p-3">{beasiswa.name}</td>
                                                    <td className="p-3">{beasiswa.provider}</td>
                                                    <td className="p-3">{new Date(beasiswa.deadline).toLocaleDateString()}</td>
                                                    <td className="p-3">
                                                        <div className="flex flex-wrap gap-2">
                                                            <Link to={`/admin-detail-beasiswa/${beasiswa.id}`} className="btn btn-xs sm:btn-sm btn-primary">Detail</Link>
                                                            <Link to={`/edit-beasiswa/${beasiswa.id}`} className="btn btn-xs sm:btn-sm btn-warning">Edit</Link>
                                                            <button onClick={() => handleDelete(beasiswa.id)} className="btn btn-xs sm:btn-sm btn-error">Hapus</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center text-gray-500 p-4">
                                                    Belum ada beasiswa ditambahkan.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <AdminSidebar />
            </div>
        </PageTransition>
    );
}

export default KelolaBeasiswa;