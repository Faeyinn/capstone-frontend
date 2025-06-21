// src/pages/ScholarshipDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ScholarshipDetail() {
    const { id } = useParams();
    const [scholarship, setScholarship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            deskripsi: "Beasiswa penuh untuk studi lanjut di berbagai universitas terbaik di Indonesia dan luar negeri. Mencakup biaya kuliah, biaya hidup, dan tunjangan lainnya. Persyaratan meliputi IPK tinggi, pengalaman organisasi, dan kemampuan bahasa Inggris yang baik. Proses seleksi melibatkan wawancara dan esai. Informasi lebih lanjut dapat ditemukan di situs web resmi LPDP."
        },
        {
            id: 2,
            nama: "Kampung Inggris Beasiswa",
            institusi: "Central Course",
            deadline: "5 November 2025",
            jenjang: "S1",
            lokasi: "Dalam Negeri",
            bidang: "Bahasa",
            deskripsi: "Program beasiswa untuk belajar bahasa Inggris intensif di Kampung Inggris, Pare. Beasiswa ini bertujuan untuk meningkatkan kemampuan berbahasa Inggris generasi muda Indonesia. Durasi program 3 bulan dengan akomodasi dan biaya kursus ditanggung penuh. Syarat pendaftaran adalah mahasiswa aktif S1 dan memiliki motivasi tinggi."
        },
        {
            id: 3,
            nama: "Beasiswa SmartPath",
            institusi: "SmartPath",
            deadline: "30 November 2025",
            jenjang: "S1",
            lokasi: "Luar Negeri",
            bidang: "Teknologi",
            deskripsi: "Beasiswa untuk mahasiswa berprestasi di bidang teknologi yang ingin melanjutkan studi di luar negeri, khususnya di universitas top Amerika dan Eropa. Mencakup biaya kuliah, tunjangan bulanan, asuransi kesehatan, dan tiket pesawat. Calon pelamar harus memiliki rekam jejak akademik yang kuat dan proyek-proyek inovatif di bidang teknologi."
        },
        {
            id: 4,
            nama: "Beasiswa Unggulan Kemendikbud",
            institusi: "Kementerian Pendidikan dan Kebudayaan",
            deadline: "15 Januari 2026",
            jenjang: "S1/S2",
            lokasi: "Dalam Negeri",
            bidang: "Umum",
            deskripsi: "Beasiswa dari pemerintah untuk berbagai jenjang studi di perguruan tinggi dalam negeri. Prioritas diberikan kepada mahasiswa berprestasi dari daerah tertinggal atau yang memiliki kontribusi sosial. Proses pendaftaran online melalui portal resmi Kemendikbud."
        },
        {
            id: 5,
            nama: "Erasmus Mundus Scholarship",
            institusi: "European Commission",
            deadline: "1 Maret 2026",
            jenjang: "S2/S3",
            lokasi: "Luar Negeri",
            bidang: "Multi-disiplin",
            deskripsi: "Beasiswa bergengsi dari Uni Eropa untuk program master dan doktoral bersama di beberapa universitas di Eropa. Program ini menawarkan kesempatan unik untuk belajar di lingkungan multikultural dan mendapatkan gelar ganda. Persyaratan sangat ketat, termasuk kemampuan bahasa Inggris yang luar biasa (IELTS/TOEFL) dan pengalaman riset."
        }
    ];

    useEffect(() => {
        setLoading(true);
        setError(null);
        // Simulasikan fetching data detail dari API
        const foundScholarship = dummyScholarships.find(s => s.id === parseInt(id));
        if (foundScholarship) {
            setScholarship(foundScholarship);
            setLoading(false);
        } else {
            setError(new Error("Beasiswa tidak ditemukan."));
            setLoading(false);
        }
    }, [id]);

    if (loading) return <div className="text-center py-10">Memuat detail beasiswa...</div>;
    if (error) return <div className="text-center py-10 text-red-600">Error: {error.message}</div>;
    if (!scholarship) return <div className="text-center py-10">Beasiswa tidak tersedia.</div>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-primary">{scholarship.nama}</h1>
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <p className="text-gray-700 text-lg mb-4"><span className="font-semibold">Institusi:</span> {scholarship.institusi}</p>
                    <p className="text-gray-700 text-lg mb-4"><span className="font-semibold">Jenjang:</span> {scholarship.jenjang}</p>
                    <p className="text-gray-700 text-lg mb-4"><span className="font-semibold">Lokasi:</span> {scholarship.lokasi}</p>
                    <p className="text-gray-700 text-lg mb-4"><span className="font-semibold">Bidang Studi:</span> {scholarship.bidang}</p>
                    <p className="text-red-600 text-lg font-bold mb-6"><span className="font-semibold">Deadline:</span> {scholarship.deadline}</p>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Deskripsi Beasiswa:</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{scholarship.deskripsi}</p>
                    
                    <div className="text-right">
                        <Link to="/scholarships" className="btn btn-outline btn-primary">
                            Kembali ke Daftar Beasiswa
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ScholarshipDetail;