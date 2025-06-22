import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { Link, useNavigate } from 'react-router-dom';

function Beranda() {
  const navigate = useNavigate();

  const handleSearch = (params) => {
    // Arahkan ke halaman ScholarshipList dengan parameter pencarian
    const queryParams = new URLSearchParams(params).toString();
    navigate(`/scholarships?${queryParams}`);
  };

  const dummyHighlightScholarships = [
    // Data ini akan diganti oleh data dari backend saat ScholarshipList diakses
    {
      id: 1,
      name: 'Beasiswa Unggulan Kemendikbud',
      provider: 'Kementerian Pendidikan dan Kebudayaan',
      deadline: '2025-08-31',
      description: 'Beasiswa penuh untuk jenjang S1, S2, dan S3 di berbagai bidang.',
      link: '#'
    },
    {
      id: 2,
      name: 'LPDP (Lembaga Pengelola Dana Pendidikan)',
      provider: 'Kementerian Keuangan RI',
      deadline: '2025-07-15',
      description: 'Beasiswa magister dan doktor dalam negeri maupun luar negeri.',
      link: '#'
    },
    // Tambahkan lebih banyak dummy data jika diperlukan
  ];

  return (
    <div>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Temukan Beasiswa Impian Anda!</h1>
            <p className="py-6">
              Jelajahi berbagai beasiswa dari berbagai penyedia, baik dalam maupun luar negeri.
              Login untuk mengelola beasiswa Anda atau daftar untuk mulai mencari.
            </p>
            <SearchBar onSearch={handleSearch} /> {/* Gunakan SearchBar di Beranda */}
            <div className="mt-8">
              <Link to="/scholarships" className="btn btn-primary mr-4">Lihat Semua Beasiswa</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Highlight Beasiswa Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyHighlightScholarships.map(scholarship => (
            <div key={scholarship.id} className="card w-96 bg-base-100 shadow-xl">
              <figure><img src="https://via.placeholder.com/400x200" alt="Beasiswa Highlight" /></figure>
              <div className="card-body">
                <h2 className="card-title">{scholarship.name}</h2>
                <p>Penyedia: {scholarship.provider}</p>
                <p>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</p>
                <div className="card-actions justify-end">
                  <Link to={`/scholarships/${scholarship.id}`} className="btn btn-info">Lihat Detail</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Beranda;