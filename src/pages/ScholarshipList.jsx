import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { scholarshipApi } from '../services/api'; // Import scholarshipApi

function ScholarshipList() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredScholarships, setFilteredScholarships] = useState([]); // Untuk filter di frontend jika backend tidak mendukung
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    jenjang: '',
    deadline: '',
    bidang: ''
  });

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await scholarshipApi.getAll();
        setScholarships(response.data);
        setFilteredScholarships(response.data); // Inisialisasi dengan semua data
      } catch (err) {
        setError('Failed to fetch scholarships. Please try again later.');
        console.error('Error fetching scholarships:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const handleSearch = (params) => {
    setSearchParams(params);
    // Karena backend saat ini tidak mendukung filter query parameter untuk getAll,
    // kita akan melakukan filter di frontend
    const { keyword, jenjang, deadline, bidang } = params;
    let tempScholarships = [...scholarships];

    if (keyword) {
      tempScholarships = tempScholarships.filter(s =>
        s.name.toLowerCase().includes(keyword.toLowerCase()) ||
        s.provider.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    // Tambahkan logika filter lainnya jika field seperti 'jenjang' dan 'bidang' ada di data beasiswa
    // Saat ini, model beasiswa Anda hanya memiliki name, provider, deadline, link.
    // Jika Anda ingin filter berdasarkan jenjang/bidang, Anda perlu menambahkan field tersebut ke model beasiswa di backend.

    setFilteredScholarships(tempScholarships);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 text-center">Loading scholarships...</div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 text-center text-red-500">{error}</div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Daftar Beasiswa</h1>
        <SearchBar onSearch={handleSearch} />
        {/* Konten untuk menampilkan daftar beasiswa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map((scholarship) => (
              <div key={scholarship.id} className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src="https://via.placeholder.com/400x200" alt="Beasiswa" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{scholarship.name}</h2>
                  <p>Penyedia: {scholarship.provider}</p>
                  <p>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</p>
                  <div className="card-actions justify-end">
                    <Link to={`/scholarships/${scholarship.id}`} className="btn btn-primary">Lihat Detail</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No scholarships found matching your criteria.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ScholarshipList;