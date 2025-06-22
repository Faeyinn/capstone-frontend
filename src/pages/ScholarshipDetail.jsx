import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { scholarshipApi } from '../services/api'; // Import scholarshipApi

function ScholarshipDetail() {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await scholarshipApi.getById(id); //
        setScholarship(response.data);
      } catch (err) {
        setError('Failed to fetch scholarship details. Please try again later.');
        console.error('Error fetching scholarship detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">Loading scholarship details...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">{error}</div>
    );
  }

  if (!scholarship) {
    return (
      <div className="container mx-auto p-4 text-center">Scholarship not found.</div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure><img src="https://via.placeholder.com/600x400" alt="Beasiswa Detail" className="w-full h-full object-cover" /></figure>
        <div className="card-body">
          <h2 className="card-title text-3xl mb-4">{scholarship.name}</h2>
          <p className="text-lg"><strong>Penyedia:</strong> {scholarship.provider}</p>
          <p className="text-lg"><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
          <p className="text-lg"><strong>Link Pendaftaran:</strong> <a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{scholarship.link}</a></p>
          <div className="card-actions justify-end mt-6">
            <Link to="/scholarships" className="btn btn-primary">Kembali ke Daftar Beasiswa</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipDetail;