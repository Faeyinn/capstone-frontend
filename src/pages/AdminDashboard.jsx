import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { scholarshipApi } from '../services/api'; // Import scholarshipApi
import { useAuth } from '../context/AuthContext'; // Import useAuth untuk isAdmin check

function AdminDashboard() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk form tambah/edit
  const [isEditing, setIsEditing] = useState(false);
  const [currentScholarship, setCurrentScholarship] = useState({
    id: null,
    name: '',
    provider: '',
    deadline: '',
    link: ''
  });

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const response = await scholarshipApi.getAll(); // Menggunakan API untuk admin juga
      setScholarships(response.data);
    } catch (err) {
      setError('Failed to fetch scholarships for admin dashboard.');
      console.error('Error fetching scholarships for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) { // Hanya fetch jika user adalah admin
      fetchScholarships();
    }
  }, [isAdmin]); // Dependensi pada isAdmin

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentScholarship({ ...currentScholarship, [name]: value });
  };

  const handleAddOrUpdateScholarship = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!currentScholarship.name || !currentScholarship.provider || !currentScholarship.deadline || !currentScholarship.link) {
      setError('All fields are required.');
      return;
    }

    try {
      if (isEditing) {
        await scholarshipApi.update(currentScholarship.id, currentScholarship);
        alert('Scholarship updated successfully!');
      } else {
        await scholarshipApi.create(currentScholarship);
        alert('Scholarship added successfully!');
      }
      fetchScholarships(); // Refresh list
      // Reset form
      setIsEditing(false);
      setCurrentScholarship({ id: null, name: '', provider: '', deadline: '', link: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save scholarship.');
      console.error('Error saving scholarship:', err);
    }
  };

  const handleEdit = (scholarship) => {
    setIsEditing(true);
    // Format deadline to 'YYYY-MM-DD' for input type='date'
    const formattedDeadline = scholarship.deadline ? new Date(scholarship.deadline).toISOString().split('T')[0] : '';
    setCurrentScholarship({ ...scholarship, deadline: formattedDeadline });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      try {
        await scholarshipApi.delete(id);
        alert('Scholarship deleted successfully!');
        fetchScholarships(); // Refresh list
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete scholarship.');
        console.error('Error deleting scholarship:', err);
      }
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 text-center text-red-500">Access Denied. You must be an admin to view this page.</div>
        <Footer />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 text-center">Loading admin dashboard...</div>
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
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

        {/* Form Tambah/Edit Beasiswa */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Beasiswa' : 'Tambah Beasiswa Baru'}</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleAddOrUpdateScholarship}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama Beasiswa</label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={currentScholarship.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="provider">Penyedia</label>
              <input
                type="text"
                id="provider"
                name="provider"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={currentScholarship.provider}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={currentScholarship.deadline}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">Link Pendaftaran</label>
              <input
                type="url"
                id="link"
                name="link"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="https://example.com/apply"
                value={currentScholarship.link}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isEditing ? 'Update Beasiswa' : 'Tambah Beasiswa'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentScholarship({ id: null, name: '', provider: '', deadline: '', link: '' });
                    setError(null);
                  }}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Batal Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabel Daftar Beasiswa */}
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Daftar Semua Beasiswa</h2>
          <table className="table w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Beasiswa</th>
                <th>Penyedia</th>
                <th>Deadline</th>
                <th>Link</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.length > 0 ? (
                scholarships.map((scholarship, index) => (
                  <tr key={scholarship.id}>
                    <td>{index + 1}</td>
                    <td>{scholarship.name}</td>
                    <td>{scholarship.provider}</td>
                    <td>{new Date(scholarship.deadline).toLocaleDateString()}</td>
                    <td><a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Link</a></td>
                    <td>
                      <button onClick={() => handleEdit(scholarship)} className="btn btn-sm btn-info mr-2">Edit</button>
                      <button onClick={() => handleDelete(scholarship.id)} className="btn btn-sm btn-error">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No scholarships found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;