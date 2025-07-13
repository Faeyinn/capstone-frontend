import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

function BerandaAdmin() {
    const navigate = useNavigate();
    const { beasiswaList, deleteBeasiswa } = useAuth();

    const handleDelete = (beasiswaId) => {
        Swal.fire({
            title: "Anda yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBeasiswa(beasiswaId);
                Swal.fire({
                    title: "Dihapus!",
                    text: "Beasiswa telah dihapus.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content text-neutral-content w-full">
                    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
                        <h1 className="mt-8 mb-8 text-3xl sm:text-4xl lg:text-5xl text-center text-primary font-bold">Daftar Beasiswa</h1> {/* Sesuaikan ukuran teks */}
                        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white bg-opacity-80 p-4 sm:p-6 shadow-lg"> {/* Sesuaikan padding */}
                            
                            {/* Tombol untuk menambah beasiswa baru */}
                            <div className="flex justify-center mb-6">
                                <Link to="/add-beasiswa" className="btn btn-info">Tambah Beasiswa Baru</Link>
                            </div>

                            <table className="table w-full mb-6 shadow-md rounded-lg">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th>Nama Beasiswa</th>
                                        <th>Jenjang</th>
                                        <th>Deadline</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {beasiswaList.length > 0 ? (
                                    beasiswaList.map((beasiswa) => (
                                        <tr key={beasiswa.id} className="text-black hover:bg-gray-100">
                                            <td>{beasiswa.nama}</td>
                                            <td>{beasiswa.jenjang}</td>
                                            <td>{beasiswa.deadline}</td>
                                            <td className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                                                <Link to={`/admin-detail-beasiswa/${beasiswa.id}`} className="btn btn-xs sm:btn-sm btn-primary">Detail</Link>
                                                <Link to={`/edit-beasiswa/${beasiswa.id}`} className="btn btn-xs sm:btn-sm btn-warning">Edit</Link>
                                                <button onClick={() => handleDelete(beasiswa.id)} className="btn btn-xs sm:btn-sm btn-error">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center text-gray-500 py-4">Belum ada beasiswa ditambahkan.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BerandaAdmin;