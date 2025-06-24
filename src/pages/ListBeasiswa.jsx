import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ListBeasiswa() {
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
                        <h1 className="mb-8 text-5xl text-center font-bold">Daftar Beasiswa</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {beasiswaList.map((beasiswa) => (
                                <div key={beasiswa.id} className="card bg-white shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title text-gray-800">{beasiswa.nama}</h2>
                                        <p className="text-gray-600">Jenjang Pendidikan: {beasiswa.jenjang}</p>
                                        <p className="text-gray-600">Deadline: {beasiswa.deadline}</p>
                                        <div className="card-actions justify-end">
                                            <Link 
                                                to={`/detail-beasiswa/${beasiswa.id}`}
                                                className="btn btn-primary"
                                            >
                                                Lihat Detail
                                            </Link>
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

export default ListBeasiswa;