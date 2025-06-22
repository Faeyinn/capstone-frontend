import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { scholarshipApi } from '../services/api';

function ScholarshipList() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    jenjang: '',
    deadline: '',
    bidang: ''
  });

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await scholarshipApi.getAll(); //
        setScholarships(response.data);
        setFilteredScholarships(response.data); //
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
    const { keyword, jenjang, deadline, bidang } = params;
    let tempScholarships = [...scholarships];

    if (keyword) {
      tempScholarships = tempScholarships.filter(s =>
        s.name.toLowerCase().includes(keyword.toLowerCase()) ||
        s.provider.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setFilteredScholarships(tempScholarships);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">Loading scholarships...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">{error}</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Daftar Beasiswa</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((scholarship) => (
            <div key={scholarship.id} className="card w-96 bg-base-100 shadow-xl">
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
  );
}

export default ScholarshipList;