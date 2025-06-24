import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function DetailBeasiswa() {
    const { id } = useParams();

    // Data dummy - dalam aplikasi nyata, fetch dari API berdasarkan ID
    const beasiswaData = {
        1: {
            id: 1,
            nama: "Beasiswa SmartPath",
            jenjang: "S1",
            deadline: "25 Desember 2025",
            deskripsi: "Beasiswa SmartPath adalah program beasiswa yang ditujukan untuk mahasiswa berprestasi yang memiliki potensi untuk menjadi pemimpin masa depan. Program ini menyediakan dukungan penuh untuk pendidikan tinggi.",
            syarat: [
                "IPK minimal 3.0",
                "Aktif dalam organisasi kemahasiswaan",
                "Surat rekomendasi dari dosen",
                "Essay motivasi",
                "Tidak sedang menerima beasiswa lain"
            ],
            benefit: [
                "Biaya kuliah penuh selama 4 tahun",
                "Uang saku bulanan Rp 2.000.000",
                "Laptop dan peralatan study",
                "Program mentoring",
                "Kesempatan magang di perusahaan partner"
            ],
            dokumen: [
                "Fotokopi KTP",
                "Transkrip nilai terbaru",
                "Surat keterangan tidak mampu",
                "Essay motivasi (max 500 kata)",
                "Surat rekomendasi dari dosen"
            ]
        },
        2: {
            id: 2,
            nama: "Beasiswa Excellence",
            jenjang: "S1",
            deadline: "30 Januari 2026",
            deskripsi: "Program beasiswa unggulan untuk mahasiswa dengan prestasi akademik tinggi dan potensi kepemimpinan yang kuat.",
            syarat: [
                "IPK minimal 3.5",
                "Prestasi akademik atau non-akademik",
                "Essay motivasi",
                "Interview online"
            ],
            benefit: [
                "Biaya kuliah penuh",
                "Tunjangan hidup bulanan",
                "Pelatihan soft skills",
                "Sertifikasi internasional"
            ],
            dokumen: [
                "Fotokopi KTP",
                "Transkrip nilai",
                "Sertifikat prestasi",
                "Essay motivasi"
            ]
        },
        3: {
            id: 3,
            nama: "Beasiswa Future Leaders",
            jenjang: "S1",
            deadline: "15 Februari 2026",
            deskripsi: "Beasiswa untuk calon pemimpin masa depan dengan fokus pada pengembangan karakter dan kemampuan kepemimpinan.",
            syarat: [
                "Pengalaman kepemimpinan",
                "Aktif dalam kegiatan sosial",
                "Interview dan assessment",
                "Komitmen program mentoring"
            ],
            benefit: [
                "Full scholarship",
                "Program mentoring eksklusif",
                "Networking dengan alumni",
                "Leadership development program"
            ],
            dokumen: [
                "CV lengkap",
                "Portfolio kepemimpinan",
                "Surat rekomendasi",
                "Video presentasi"
            ]
        }
    };

    const beasiswa = beasiswaData[id];

    if (!beasiswa) {
        return (
            <div>
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Beasiswa Tidak Ditemukan</h1>
                        <Link to="/" className="btn btn-primary">Kembali ke Daftar Beasiswa</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

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
                            <div className="breadcrumbs text-sm mb-6">
                                <ul>
                                    <li><Link to="/list-beasiswa">Daftar Beasiswa</Link></li>
                                    <li>{beasiswa.nama}</li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2">
                                    <div className="card bg-primary shadow-xl">
                                        <div className="card-body">
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
                                <div className="lg:col-span-1">
                                    <div className="card bg-base-100 shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title mb-4">Aksi Cepat</h2>

                                            <div className="space-y-3">
                                                <button className="btn btn-primary w-full">
                                                    Daftar Sekarang
                                                </button>
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

export default DetailBeasiswa;