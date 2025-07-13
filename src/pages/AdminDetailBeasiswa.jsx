import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

function AdminDetailBeasiswa() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { beasiswaList, editBeasiswa, deleteBeasiswa } = useAuth();

    const beasiswa = beasiswaList.find(b => b.id === parseInt(id));

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (beasiswa) {
            setFormData({
                id: beasiswa.id,
                nama: beasiswa.nama,
                jenjang: beasiswa.jenjang,
                deadline: beasiswa.deadline,
                deskripsi: beasiswa.deskripsi,
                syarat: beasiswa.syarat.join(', '),
                benefit: beasiswa.benefit.join(', '),
                dokumen: beasiswa.dokumen.join(', ')
            });
        }
    }, [beasiswa]);

    if (!beasiswa) {
        return (
            <div>
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Beasiswa Tidak Ditemukan</h1>
                        <Link to="/beranda-admin" className="btn btn-primary">Kembali ke Beranda Admin</Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        const updatedBeasiswa = {
            id: formData.id,
            nama: formData.nama,
            jenjang: formData.jenjang,
            deadline: formData.deadline,
            deskripsi: formData.deskripsi,
            syarat: formData.syarat.split(',').map(item => item.trim()),
            benefit: formData.benefit.split(',').map(item => item.trim()),
            dokumen: formData.dokumen.split(',').map(item => item.trim())
        };
        editBeasiswa(updatedBeasiswa);
        setIsEditing(false);
        Swal.fire({
            title: "Success!",
            text: "Beasiswa berhasil di update!",
            icon: "success"
        });
    };

    const handleDelete = () => {
        if (Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Beasiswa has been deleted.",
                    icon: "success"
                });
                deleteBeasiswa(beasiswa.id);
                navigate('/beranda-admin');
            }
        })) {
        }
    };

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content text-black">
                    <div className="container mx-auto px-4">
                        <h1 className="mt-8 mb-8 text-5xl text-center text-primary font-bold">Detail Beasiswa</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <div className="card bg-primary text-black shadow-xl">
                                    <div className="card-body">
                                        <div>
                                            <Link to="/beranda-admin" className="btn btn-accent">Back</Link>
                                        </div>
                                        <h1 className="card-title text-3xl mb-4">{beasiswa.nama}</h1>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <span className="font-semibold">Jenjang:</span>
                                                <span className="ml-2">{beasiswa.jenjang}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold">Deadline:</span>
                                                <span className="ml-2">{beasiswa.deadline}</span>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Deskripsi</h2>
                                            <p className="leading-relaxed">{beasiswa.deskripsi}</p>
                                        </div>

                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Persyaratan</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {beasiswa.syarat.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Manfaat</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {beasiswa.benefit.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Dokumen yang Diperlukan</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {beasiswa.dokumen.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1 text-black">
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title mb-4">Aksi Cepat</h2>

                                        <div>
                                            <Link to={`/edit-beasiswa/${beasiswa.id}`} className="btn btn-warning mr-4">Edit</Link>
                                            <button className="btn btn-error justify-end" onClick={handleDelete}>Hapus</button>
                                        </div>

                                        <div className="divider"></div>

                                        <div className="space-y-2">
                                            <h3 className="font-semibold">Informasi Penting:</h3>
                                            <div className="text-sm">
                                                <p className="mb-2">📅 <strong>Deadline:</strong> {beasiswa.deadline}</p>
                                                <p className="mb-2">🎓 <strong>Jenjang:</strong> {beasiswa.jenjang}</p>
                                                <p className="mb-2">📋 <strong>Status:</strong> <span className="text-green-600">Buka</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDetailBeasiswa;