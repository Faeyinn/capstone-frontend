import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useState } from 'react'; // Import useState

function BerandaAdmin() {
    const { beasiswaList, addBeasiswa } = useAuth(); // Ambil beasiswaList dan addBeasiswa dari context

    // State untuk form tambah beasiswa
    const [newBeasiswa, setNewBeasiswa] = useState({
        nama: "",
        penyedia: "", // Tambahkan penyedia
        jenjang: "",
        deadline: "",
        deskripsi: "",
        syarat: [],
        benefit: [],
        dokumen: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBeasiswa(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleArrayInputChange = (e) => {
        const { name, value } = e.target;
        setNewBeasiswa(prevState => ({
            ...prevState,
            [name]: value.split(',').map(item => item.trim()) // Pisahkan dengan koma
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBeasiswa(newBeasiswa);
        // Reset form setelah menambah
        setNewBeasiswa({
            nama: "",
            penyedia: "",
            jenjang: "",
            deadline: "",
            deskripsi: "",
            syarat: [],
            benefit: [],
            dokumen: []
        });
        alert('Beasiswa berhasil ditambahkan!');
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
                    <div className="max-w-7xl mx-auto p-6">

                        <h1 className="mt-8 mb-8 text-5xl text-center font-bold">Daftar Beasiswa</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {beasiswaList.map((beasiswa) => (
                                <div key={beasiswa.id} className="card bg-white shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title text-gray-800">{beasiswa.nama}</h2>
                                        <p className="text-gray-600">Jenjang Pendidikan: {beasiswa.jenjang}</p>
                                        <p className="text-gray-600">Deadline: {beasiswa.deadline}</p>
                                        <div className="card-actions justify-end">
                                            <Link to={`/admin-detail-beasiswa/${beasiswa.id}`} className="btn btn-primary">Detail</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h1 className="mt-10 mb-8 text-5xl text-center font-bold">Manajemen Beasiswa</h1>
                        <div className="flex justify-center items-center bg-white bg-opacity-80 rounded-lg p-8">
                            <fieldset className="fieldset bg-white shadow-xl rounded-box w-xs border p-4">
                                <h2 className="text-xl text-black font-bold mb-4 text-center">Tambah Beasiswa</h2>
                                <form onSubmit={handleSubmit}>
                                    <label className="label text-black">Nama Beasiswa</label>
                                    <input type="text" name="nama" className="input bg-white text-black border-gray-400 w-full" placeholder="Nama Beasiswa" value={newBeasiswa.nama} onChange={handleInputChange} required />

                                    <label className="label text-black">Jenjang Pendidikan</label>
                                    <input type="text" name="jenjang" className="input bg-white text-black border-gray-400 w-full" placeholder="Jenjang Pendidikan" value={newBeasiswa.jenjang} onChange={handleInputChange} required />

                                    <label className="label text-black">Deadline</label>
                                    <input type="text" name="deadline" className="input bg-white text-black border-gray-400 w-full" placeholder="Deadline (contoh: 25 Desember 2025)" value={newBeasiswa.deadline} onChange={handleInputChange} required />

                                    <label className="label text-black">Deskripsi Singkat</label>
                                    <textarea name="deskripsi" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Deskripsi Singkat" value={newBeasiswa.deskripsi} onChange={handleInputChange} required></textarea>

                                    <label className="label text-black">Persyaratan (pisahkan dengan koma)</label>
                                    <textarea name="syarat" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Syarat 1, Syarat 2, ..." value={newBeasiswa.syarat.join(', ')} onChange={handleArrayInputChange} required></textarea>

                                    <label className="label text-black">Dokumen (pisahkan dengan koma)</label>
                                    <textarea name="dokumen" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Dokumen 1, Dokumen 2, ..." value={newBeasiswa.dokumen.join(', ')} onChange={handleArrayInputChange} required></textarea>

                                    <label className="label text-black">Benefit (pisahkan dengan koma)</label>
                                    <textarea name="benefit" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Benefit 1, Benefit 2, ..." value={newBeasiswa.benefit.join(', ')} onChange={handleArrayInputChange} required></textarea>

                                    <button type="submit" className="btn btn-success mt-4 mb-4 w-full">Tambah Beasiswa</button>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BerandaAdmin;