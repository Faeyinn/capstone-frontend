// src/pages/ScholarshipList.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

function ScholarshipList() {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});

    // Contoh data (akan diganti dengan fetch dari API nanti)
    const dummyScholarships = [
        {
            id: 1,
            nama: "Beasiswa Garuda",
            institusi: "Lembaga Pengelola Dana Pendidikan",
            deadline: "31 Desember 2025",
            jenjang: "S2/S3",
            lokasi: "Dalam Negeri",
            bidang: "Umum",
            deskripsi: "Beasiswa penuh untuk studi lanjut di berbagai universitas terbaik di Indonesia dan luar negeri."
        },
        {
            id: 2,
            nama: "Kampung Inggris Beasiswa",
            institusi: "Central Course",
            deadline: "5 November 2025",
            jenjang: "S1",
            lokasi: "Dalam Negeri",
            bidang: "Bahasa",
            deskripsi: "Program beasiswa untuk belajar bahasa Inggris intensif di Kampung Inggris, Pare."
        },
        {
            id: 3,
            nama: "Beasiswa SmartPath",
            institusi: "SmartPath",
            deadline: "30 November 2025",
            jenjang: "S1",
            lokasi: "Luar Negeri",
            bidang: "Teknologi",
            deskripsi: "Beasiswa untuk mahasiswa berprestasi di bidang teknologi yang ingin melanjutkan studi di luar negeri."
        },
        {
            id: 4,
            nama: "Beasiswa Unggulan Kemendikbud",
            institusi: "Kementerian Pendidikan dan Kebudayaan",
            deadline: "15 Januari 2026",
            jenjang: "S1/S2",
            lokasi: "Dalam Negeri",
            bidang: "Umum",
            deskripsi: "Beasiswa dari pemerintah untuk berbagai jenjang studi di perguruan tinggi dalam negeri."
        },
    ];

    useEffect(() => {
        // Simulasikan fetching data dari API
        setLoading(true);
        setTimeout(() => {
            setScholarships(dummyScholarships);
            setLoading(false);
        }, 1000);
    }, []);

    const handleSearch = (newFilters) => {
        console.log("Filter yang dipilih di daftar beasiswa:", newFilters);
        setFilters(newFilters);
        // Di sini Anda akan mengimplementasikan logika filter berdasarkan newFilters
        // Untuk contoh ini, kita akan filter dummyScholarships
        const filtered = dummyScholarships.filter(scholarship => {
            const keywordMatch = !newFilters.keyword ||
                                 scholarship.nama.toLowerCase().includes(newFilters.keyword.toLowerCase()) ||
                                 scholarship.institusi.toLowerCase().includes(newFilters.keyword.toLowerCase());
            const jenjangMatch = !newFilters.jenjang || scholarship.jenjang.includes(newFilters.jenjang);
            const lokasiMatch = !newFilters.lokasi || scholarship.lokasi === newFilters.lokasi;
            const bidangMatch = !newFilters.bidang || scholarship.bidang === newFilters.bidang;

            // Logika deadline bisa lebih kompleks, ini contoh sederhana
            const deadlineMatch = !newFilters.deadline || (
                newFilters.deadline === "Terdekat" && new Date(scholarship.deadline).getTime() > Date.now()
                // Tambahkan logika untuk "Bulan Ini" dan "Tahun Ini" jika diperlukan
            );
            
            return keywordMatch && jenjangMatch && lokasiMatch && bidangMatch && deadlineMatch;
        });
        setScholarships(filtered);
    };

    if (error) return <div className="text-center py-10 text-red-600">Error: {error.message}</div>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Daftar Semua Beasiswa</h1>
                <div className="mb-8">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {scholarships.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scholarships.map((beasiswa) => (
                            <div key={beasiswa.id} className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl text-primary">{beasiswa.nama}</h2>
                                    <p className="text-gray-700">Institusi: {beasiswa.institusi}</p>
                                    <p className="text-gray-700">Jenjang: {beasiswa.jenjang}</p>
                                    <p className="text-red-500 font-semibold">Deadline: {beasiswa.deadline}</p>
                                    <div className="card-actions justify-end mt-4">
                                        <Link to={`/scholarships/${beasiswa.id}`} className="btn btn-primary">
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-lg">Tidak ada beasiswa yang ditemukan dengan filter yang dipilih.</p>
                )}
            </div>
            <Footer />
        </>
    );
}

export default ScholarshipList;