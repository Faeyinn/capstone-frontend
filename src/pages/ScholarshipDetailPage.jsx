import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getScholarshipById } from '../services/scholarshipService';
// No longer need './Pages.css'

const ScholarshipDetailPage = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const data = await getScholarshipById(id);
        setScholarship(data);
      } catch (err) {
        setError('Failed to fetch scholarship details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarship();
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-8 text-center text-soft-blue-medium">Loading scholarship details...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600 font-semibold">{error}</div>;
  if (!scholarship) return <div className="container mx-auto px-4 py-8 text-center text-text-secondary">Scholarship not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-soft-blue-dark">
        <h2 className="text-4xl font-bold text-soft-blue-darker mb-6">{scholarship.name}</h2>
        <p className="text-lg text-text-primary mb-3"><strong>Provider:</strong> {scholarship.provider}</p>
        <p className="text-lg text-text-primary mb-3"><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
        <p className="text-lg text-text-primary mb-6">
          <strong>Link:</strong>{' '}
          <a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="text-soft-blue-medium hover:underline">
            {scholarship.link}
          </a>
        </p>
        <Link to="/scholarships" className="inline-block px-6 py-3 bg-soft-blue-medium text-white font-semibold rounded-md shadow-md hover:bg-soft-blue-dark transition duration-300">Back to Scholarships</Link>
      </div>
    </div>
  );
};

export default ScholarshipDetailPage;