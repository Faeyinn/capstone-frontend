import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PageTransition from '../../components/PageTransition';

function AdminDetailBeasiswa() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [beasiswa, setBeasiswa] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://20.255.58.218:3100/api/scholarships/${id}`);
                if (!res.ok) {
                    throw new Error("Gagal mengambil data detail beasiswa");
                }
                const data = await res.json();
                setBeasiswa(data);
            } catch (err) {
                console.error("DETAIL ERROR:", err);
                setBeasiswa(null);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <PageTransition>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-xl">Memuat detail beasiswa...</p>
                </div>
            </PageTransition>
        );
    }

    if (!beasiswa) {
        return (
            <PageTransition>
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Beasiswa Tidak Ditemukan</h1>
                        <Link to="/beranda-admin" className="btn btn-primary">Kembali ke Beranda Admin</Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    const requirements = beasiswa.requirements ? beasiswa.requirements.split('\n') : [];
    const documents = beasiswa.documents ? beasiswa.documents.split('\n') : [];
    const benefit = beasiswa.benefit ? beasiswa.benefit.split('\n') : [];

    const handleDelete = () => {
        Swal.fire({
            title: "Apakah yakin ingin menghapus?",
            text: "Data beasiswa akan dihapus permanen.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!"
        }).then((result) => {
            if (result.isConfirmed) {
                // TODO: Tambahkan request DELETE ke backend jika tersedia
                Swal.fire({
                    title: "Berhasil!",
                    text: "Beasiswa telah dihapus.",
                    icon: "success"
                });
                navigate('/beranda-admin');
            }
        });
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <PageTransition>
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
                                            <button onClick={handleBack} className="btn btn-accent">Back</button>
                                        </div>
                                        <h1 className="card-title text-3xl mb-4">{beasiswa.name}</h1>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <span className="font-semibold">Penyedia:</span>
                                                <span className="ml-2">{beasiswa.provider}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold">Deadline:</span>
                                                <span className="ml-2">{new Date(beasiswa.deadline).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Deskripsi</h2>
                                            <p className="leading-relaxed">{beasiswa.description}</p>
                                        </div>
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Persyaratan</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {requirements.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Manfaat</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {benefit.length > 0 && benefit[0] !== null
                                                    ? benefit.map((item, index) => (
                                                        <li key={index}>{item}</li>
                                                    ))
                                                    : <li>(Tidak ada informasi manfaat)</li>
                                                }
                                            </ul>
                                        </div>
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Dokumen yang Diperlukan</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {documents.map((item, index) => (
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
                                                <p className="mb-2">📅 <strong>Deadline:</strong> {new Date(beasiswa.deadline).toLocaleDateString()}</p>
                                                <p className="mb-2">🏤 <strong>Penyedia:</strong> {beasiswa.provider}</p>
                                                <p className="mb-2">📋 <strong>Status:</strong> <span className={beasiswa.status === "Available" ? "text-green-600" : "text-red-600"}>{beasiswa.status}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

export default AdminDetailBeasiswa;