import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useState, useEffect } from 'react'; // Import useState dan useEffect

function AdminDetailBeasiswa() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { beasiswaList, editBeasiswa, deleteBeasiswa } = useAuth(); // Ambil beasiswaList, editBeasiswa, deleteBeasiswa dari context

    const beasiswa = beasiswaList.find(b => b.id === parseInt(id)); // Cari beasiswa berdasarkan ID

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
                syarat: beasiswa.syarat.join(', '), // Ubah array menjadi string untuk input
                benefit: beasiswa.benefit.join(', '),
                dokumen: beasiswa.dokumen.join(', ')
            });
        }
    }, [beasiswa]);

    if (!beasiswa) {
        return (
            <div>
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Beasiswa Tidak Ditemukan</h1>
                        <Link to="/beranda-admin" className="btn btn-primary">Kembali ke Beranda Admin</Link>
                    </div>
                </div>
                <Footer />
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
        alert('Beasiswa berhasil diupdate!');
    };

    const handleDelete = () => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus beasiswa ${beasiswa.nama}?`)) {
            deleteBeasiswa(beasiswa.id);
            alert('Beasiswa berhasil dihapus!');
            navigate('/beranda-admin'); // Kembali ke beranda admin setelah dihapus
        }
    };

    return (
        <div>
            <Navbar />

            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://ik.imagekit.io/xf0h05qpxc/Unand.jpg?updatedAt=1750638177955)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content">
                        <div className="container mx-auto px-4">
                            {/* Breadcrumb */}
                            <Link to="/beranda-admin" className="btn btn-accent m-4">Back</Link>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2">
                                    <div className="card bg-primary shadow-xl">
                                        <div className="card-body">
                                            {isEditing ? (
                                                <form>
                                                    <label className="label text-black">Nama Beasiswa</label>
                                                    <input type="text" name="nama" className="input bg-white text-black border-gray-400 w-full mb-4" value={formData.nama} onChange={handleInputChange} />

                                                    <label className="label text-black">Jenjang</label>
                                                    <input type="text" name="jenjang" className="input bg-white text-black border-gray-400 w-full mb-4" value={formData.jenjang} onChange={handleInputChange} />

                                                    <label className="label text-black">Deadline</label>
                                                    <input type="text" name="deadline" className="input bg-white text-black border-gray-400 w-full mb-4" value={formData.deadline} onChange={handleInputChange} />

                                                    <label className="label text-black">Deskripsi</label>
                                                    <textarea name="deskripsi" className="textarea bg-white text-black border-gray-400 w-full mb-4" value={formData.deskripsi} onChange={handleInputChange}></textarea>

                                                    <label className="label text-black">Persyaratan (pisahkan dengan koma)</label>
                                                    <textarea name="syarat" className="textarea bg-white text-black border-gray-400 w-full mb-4" value={formData.syarat} onChange={handleInputChange}></textarea>

                                                    <label className="label text-black">Manfaat (pisahkan dengan koma)</label>
                                                    <textarea name="benefit" className="textarea bg-white text-black border-gray-400 w-full mb-4" value={formData.benefit} onChange={handleInputChange}></textarea>

                                                    <label className="label text-black">Dokumen yang Diperlukan (pisahkan dengan koma)</label>
                                                    <textarea name="dokumen" className="textarea bg-white text-black border-gray-400 w-full mb-4" value={formData.dokumen} onChange={handleInputChange}></textarea>

                                                    <button type="button" className="btn btn-success mr-2" onClick={handleSave}>Simpan</button>
                                                    <button type="button" className="btn btn-ghost" onClick={() => setIsEditing(false)}>Batal</button>
                                                </form>
                                            ) : (
                                                <>
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
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="lg:col-span-1">
                                    <div className="card bg-base-100 shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title mb-4">Aksi Cepat</h2>

                                            <div>
                                                <button className="btn btn-warning justify-end mr-4" onClick={() => setIsEditing(true)}>Edit</button>
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

            <Footer />
        </div>
    );
}

export default AdminDetailBeasiswa;