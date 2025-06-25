import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function BerandaAdmin() {
    // Data dummy beasiswa
    const beasiswaList = [
        {
            id: 1,
            nama: "Beasiswa SmartPath",
            jenjang: "S1",
            deadline: "25 Desember 2025",
            deskripsi: "Beasiswa untuk mahasiswa berprestasi...",
            syarat: ["IPK minimal 3.0", "Aktif organisasi", "Surat rekomendasi"],
            benefit: ["Biaya kuliah penuh", "Uang saku bulanan", "Laptop"]
        },
        {
            id: 2,
            nama: "Beasiswa Excellence",
            jenjang: "S1",
            deadline: "30 Januari 2026",
            deskripsi: "Program beasiswa unggulan...",
            syarat: ["IPK minimal 3.5", "Prestasi akademik", "Essay motivasi"],
            benefit: ["Biaya kuliah", "Tunjangan hidup", "Pelatihan skill"]
        },
        {
            id: 3,
            nama: "Beasiswa Future Leaders",
            jenjang: "S1",
            deadline: "15 Februari 2026",
            deskripsi: "Beasiswa untuk calon pemimpin masa depan...",
            syarat: ["Leadership experience", "Community service", "Interview"],
            benefit: ["Full scholarship", "Mentoring program", "Networking"]
        }
    ];

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
                        <h1 className="mb-8 text-5xl text-center font-bold">Manajemen Beasiswa</h1>
                        <div className="flex justify-center items-center bg-white bg-opacity-80 rounded-lg p-8">
                            <fieldset className="fieldset bg-white shadow-xl rounded-box w-xs border p-4">
                                <h2 className="text-xl text-black font-bold mb-4 text-center">Tambah Beasiswa</h2>

                                <label className="label text-black">Nama Beasiswa</label>
                                <input type="name" className="input bg-white text-black border-gray-400" placeholder="Nama Beasiswa" />

                                <label className="label text-black">Penyedia Beasiswa</label>
                                <input type="name" className="input bg-white text-black border-gray-400" placeholder="Penyedia Beasiswa" />
                               
                                <label className="label text-black">Jenjang Pendidikan</label>
                                <input type="name" className="input bg-white text-black border-gray-400" placeholder="Jenjang Pendidikan" />
                               
                                <label className="label text-black">Deadline</label>
                                <input type="name" className="input bg-white text-black border-gray-400" placeholder="Deadline" />
                               
                                <label className="label text-black">Deskripsi Singkat</label>
                                <input type="name" className="input bg-white text-black border-gray-400" placeholder="Deskripsi Singkat" />
                               
                                <label className="label text-black">Persyaratan</label>
                                <input type="name" className="input bg-white text-black border-gray-400" placeholder="Persyaratan" />
                               
                                <label className="label text-black">Dokumen</label>
                                <input type="name" className="input bg-white text-black border-gray-400" placeholder="Dokumen" />
                               
                                <label className="label text-black">Benefit</label>
                                <input type="name" className="input bg-white text-black border-gray-400" placeholder="Benefit" />

                                <button className="btn btn-success mt-4 mb-4">Tambah</button>
                            </fieldset>
                        </div>

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
                                            <button className="btn btn-warning">Edit</button>
                                            <button className="btn btn-error">Hapus</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BerandaAdmin;