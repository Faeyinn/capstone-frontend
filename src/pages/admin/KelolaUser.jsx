import AdminSidebar from '../../components/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import PageTransition from '../../components/PageTransition'

function KelolaUser() {
    const { users, deleteUser } = useAuth();

    const handleDelete = async (email) => {
        Swal.fire({
            title: 'Yakin ingin menghapus?',
            text: `User dengan email "${email}" akan dihapus permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteUser(email);
                if (success) {
                    Swal.fire('Dihapus!', 'User berhasil dihapus.', 'success');
                } else {
                    Swal.fire('Gagal!', 'User gagal dihapus.', 'error');
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

                    {/* Main Content */}
                    <div className="px-4 py-8 bg-base-100 min-h-screen">
                        <div className="max-w-5xl mx-auto">
                            <h1 className="text-4xl font-bold text-primary text-center mb-8">
                                Kelola Pengguna
                            </h1>

                            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-base-200">
                                <table className="table w-full text-sm sm:text-base">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th className="p-4 text-left">Email</th>
                                            <th className="p-4 text-left">Role</th>
                                            <th className="p-4 text-left">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? (
                                            users.map((user, index) => (
                                                <tr key={index} className="hover:bg-gray-100 text-gray-800">
                                                    <td className="p-4">{user.email}</td>
                                                    <td className="p-4 capitalize">{user.role}</td>
                                                    <td className="p-4">
                                                        <button
                                                            onClick={() => handleDelete(user.email)}
                                                            className="btn btn-sm btn-error"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center text-gray-500 p-4">
                                                    Belum ada pengguna terdaftar.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Admin */}
                <AdminSidebar />
            </div>
        </PageTransition>
    );
}

export default KelolaUser;
