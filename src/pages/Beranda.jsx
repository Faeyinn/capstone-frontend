import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Unand from '../assets/Unand.jpg';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';

function Beranda() {
    const handleSearch = (filters) => {
        console.log("Filter yang dipilih:", filters);
        // Implement search logic here
    };

    // Data contoh beasiswa unggulan
    const beasiswaUnggulan = [
        {
            id: 1,
            nama: "Beasiswa Garuda",
            institusi: "Lembaga Pengelola Dana Pendidikan",
            deadline: "31 Desember 2025",
            jenjang: "S2/S3",
        },
        {
            id: 2,
            nama: "Kampung Inggris Beasiswa",
            institusi: "Central Course",
            deadline: "5 November 2025",
            jenjang: "S1",
        },
        {
            id: 3,
            nama: "Beasiswa SmartPath",
            institusi: "SmartPath",
            deadline: "30 November 2025",
            jenjang: "S1",
        }
    ];

    // Data statistik
    const statistik = {
        totalBeasiswa: 1247,
        totalPengguna: 15340,
        beasiswaBaru: 23
    };

    // Data testimoni
    const testimoni = [
        {
            id: 1,
            nama: "Hanaviz",
            beasiswa: "Beasiswa Garuda",
            universitas: "Andalas University",
            jurusan: "Computer Engineering",
            foto: "https://iili.io/FxVRmCb.jpg",
            cerita: "ScholarMatch membantu saya menemukan beasiswa impian ke Oxford. Platform ini sangat user-friendly dan informasinya lengkap.",
            tahun: "2024"
        },
        {
            id: 2,
            nama: "Bima Setia Pratama",
            beasiswa: "Beasiswa SmartPath",
            universitas: "Andalas University",
            jurusan: "Computer Engineering",
            foto: "https://iili.io/FxVhKCl.jpg",
            cerita: "Berkat ScholarMatch, saya berhasil mendapatkan beasiswa SmartPath. Fitur notifikasi deadline sangat membantu saya tidak melewatkan kesempatan emas.",
            tahun: "2023"
        },
        {
            id: 3,
            nama: "Andi Tri Akira",
            beasiswa: "Kampung Inggris Beasiswa",
            universitas: "Andalas University",
            jurusan: "Computer Engineering",
            foto: "https://iili.io/FxVh3Q4.jpg",
            cerita: "Platform ini benar-benar game changer! Saya bisa filter beasiswa sesuai minat saya di bidang teknologi. Sekarang saya study di Unand dan sangat bersyukur.",
            tahun: "2024"
        },
    ];

    const handleDetailClick = (beasiswa) => {
        console.log("Detail beasiswa:", beasiswa);
        // Implement navigation to detail page
    };

    // State untuk carousel testimoni
    const [currentTestimoni, setCurrentTestimoni] = useState(0);

    const nextTestimoni = () => {
        setCurrentTestimoni((prev) => (prev + 1) % testimoni.length);
    };

    const prevTestimoni = () => {
        setCurrentTestimoni((prev) => (prev - 1 + testimoni.length) % testimoni.length);
    };

    const goToTestimoni = (index) => {
        setCurrentTestimoni(index);
    };

    return (
        <>
            <Navbar />

            <div className="hero min-h-screen relative">
                <img src={Unand} alt="Ilustrasi Mahasiswa Berprestasi" className="w-full h-full object-cover absolute inset-0 opacity-50" />
                <div className="hero-overlay bg-black bg-opacity-60"></div>
                <div className="hero-content text-center relative z-10 flex flex-col justify-between h-full">
                    <div className="flex-grow flex items-center justify-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold text-white">Welcome to ScholarMatch</h1>
                            <p className="py-6 text-white">"Temukan Beasiswa Impianmu Disini !"</p>
                            <button className="btn btn-primary mr-4">Cari Beasiswa</button>
                            <button className="btn btn-primary">Daftar Akun</button>
                        </div>
                    </div>
                    <div className="pb-10 w-full">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </div>

            {/* Statistik Singkat Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
                        ScholarMatch dalam Angka
                    </h2>
                    <p className="text-center text-gray-600 mb-12">
                        Bergabunglah dengan ribuan mahasiswa yang telah meraih beasiswa impian mereka
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">
                                {statistik.totalBeasiswa.toLocaleString()}
                            </h3>
                            <p className="text-gray-600 font-medium">Beasiswa Aktif</p>
                            <p className="text-sm text-gray-500 mt-2">Dari berbagai institusi terpercaya</p>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                </svg>
                            </div>
                            <h3 className="text-4xl font-bold text-green-600 mb-2">
                                {statistik.totalPengguna.toLocaleString()}
                            </h3>
                            <p className="text-gray-600 font-medium">Pengguna Terdaftar</p>
                            <p className="text-sm text-gray-500 mt-2">Mahasiswa dari seluruh Indonesia</p>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <h3 className="text-4xl font-bold text-purple-600 mb-2">
                                {statistik.beasiswaBaru}
                            </h3>
                            <p className="text-gray-600 font-medium">Beasiswa Baru</p>
                            <p className="text-sm text-gray-500 mt-2">Ditambahkan minggu ini</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlight Beasiswa Unggulan Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-8 text-primary">
                        Highlight Beasiswa Unggulan
                    </h2>
                    <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
                        Jangan lewatkan kesempatan emas untuk meraih beasiswa terbaik dari institusi terkemuka di dunia
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {beasiswaUnggulan.map((beasiswa) => (
                            <div key={beasiswa.id} className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                                <div className="card-body p-6">
                                    <h3 className="card-title text-xl font-semibold text-gray-800 mb-3">
                                        {beasiswa.nama}
                                    </h3>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                            </svg>
                                            <span className="text-sm">{beasiswa.institusi}</span>
                                        </div>
                                        
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                            </svg>
                                            <span className="text-sm">Deadline: {beasiswa.deadline}</span>
                                        </div>
                                        
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                            </svg>
                                            <span className="text-sm">Jenjang: {beasiswa.jenjang}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="card-actions justify-end">
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleDetailClick(beasiswa)}
                                        >
                                            Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <button className="btn btn-outline btn-primary btn-lg">
                            Lihat Semua Beasiswa
                        </button>
                    </div>
                </div>
            </div>

            {/* Testimonial Carousel Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Kata Mereka Tentang ScholarMatch</h2>
                    <p className="text-gray-600 mb-10">Dengar langsung dari para penerima beasiswa yang sukses melalui platform kami.</p>

                    <div className="carousel w-full rounded-box shadow-xl bg-white p-8 relative">
                        {testimoni.map((item, index) => (
                            <div
                                key={item.id}
                                id={`slide${index + 1}`}
                                className={`carousel-item flex flex-col items-center justify-center w-full ${index === currentTestimoni ? '' : 'hidden'}`}
                            >
                                <div className="avatar mb-6">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={item.foto} alt={`${item.nama}'s photo`} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.nama}</h3>
                                <p className="text-lg text-blue-600 font-medium mb-1">{item.beasiswa} | {item.tahun}</p>
                                <p className="text-gray-700 text-md mb-4">{item.universitas} - {item.jurusan}</p>
                                <p className="text-gray-600 italic leading-relaxed max-w-prose">"{item.cerita}"</p>
                            </div>
                        ))}

                        {/* Carousel Navigation Buttons */}
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <button onClick={prevTestimoni} className="btn btn-circle bg-primary text-white hover:bg-blue-700">❮</button>
                            <button onClick={nextTestimoni} className="btn btn-circle bg-primary text-white hover:bg-blue-700">❯</button>
                        </div>
                    </div>
                    {/* Carousel Dots */}
                    <div className="flex justify-center w-full py-2 gap-2">
                        {testimoni.map((_, index) => (
                            <a
                                key={index}
                                href={`#slide${index + 1}`}
                                onClick={() => goToTestimoni(index)}
                                className={`btn btn-xs ${index === currentTestimoni ? 'btn-primary' : 'btn-base-200'}`}
                            >
                                {index + 1}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Beranda;