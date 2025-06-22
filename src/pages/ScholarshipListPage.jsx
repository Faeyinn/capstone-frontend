import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllScholarships } from '../services/scholarshipService';
// No longer need './Pages.css'

const ScholarshipListPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const data = await getAllScholarships();
        setScholarships(data);
      } catch (err) {
        setError('Failed to fetch scholarships.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  if (loading) return <div className="container mx-auto px-4 py-8 text-center text-soft-blue-medium">Loading scholarships...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600 font-semibold">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center text-soft-blue-darker mb-8">Available Scholarships</h2>
      {scholarships.length === 0 ? (
        <p className="text-center text-lg text-text-secondary">No scholarships found at the moment.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <li key={scholarship.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-l-4 border-soft-blue-dark flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-soft-blue-medium mb-2">{scholarship.name}</h3>
                <p className="text-text-secondary mb-1"><strong>Provider:</strong> {scholarship.provider}</p>
                <p className="text-text-secondary"><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
              </div>
              <Link to={`/scholarships/${scholarship.id}`} className="mt-4 inline-block px-4 py-2 bg-soft-blue-medium text-white font-medium rounded-md shadow-sm hover:bg-soft-blue-dark transition duration-300 self-start">View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScholarshipListPage;