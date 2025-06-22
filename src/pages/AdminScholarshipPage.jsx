import React, { useState, useEffect } from 'react';
import { getAllScholarships, createScholarship, updateScholarship, deleteScholarship } from '../services/scholarshipService';
// No longer need './Pages.css'

const AdminScholarshipPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [form, setForm] = useState({ name: '', provider: '', deadline: '', link: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const data = await getAllScholarships();
      setScholarships(data);
    } catch (err) {
      setMessage('Failed to fetch scholarships.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      if (editingScholarship) {
        await updateScholarship(editingScholarship.id, form);
        setMessage('Scholarship updated successfully!');
      } else {
        await createScholarship(form);
        setMessage('Scholarship created successfully!');
      }
      setForm({ name: '', provider: '', deadline: '', link: '' });
      setEditingScholarship(null);
      fetchScholarships();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Operation failed');
    }
  };

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setForm({
      name: scholarship.name,
      provider: scholarship.provider,
      deadline: scholarship.deadline.split('T')[0], // Format for input type="date"
      link: scholarship.link,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      setMessage(''); // Clear previous messages
      try {
        await deleteScholarship(id);
        setMessage('Scholarship deleted successfully!');
        fetchScholarships();
      } catch (error) {
        setMessage(error.response?.data?.message || error.message || 'Deletion failed');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingScholarship(null);
    setForm({ name: '', provider: '', deadline: '', link: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center text-soft-blue-darker mb-8">Admin Scholarship Management</h2>
      {message && (
        <p className={`mb-6 p-3 rounded-md text-center ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </p>
      )}

      <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
        <h3 className="text-3xl font-semibold text-center text-soft-blue-medium mb-6">
          {editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}
        </h3>
        <form onSubmit={handleCreateOrUpdate} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-soft-blue-medium rounded-md shadow-sm focus:ring-soft-blue-dark focus:border-soft-blue-dark sm:text-sm bg-soft-blue-lightest" />
          </div>
          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">Provider:</label>
            <input type="text" id="provider" name="provider" value={form.provider} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-soft-blue-medium rounded-md shadow-sm focus:ring-soft-blue-dark focus:border-soft-blue-dark sm:text-sm bg-soft-blue-lightest" />
          </div>
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">Deadline:</label>
            <input type="date" id="deadline" name="deadline" value={form.deadline} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-soft-blue-medium rounded-md shadow-sm focus:ring-soft-blue-dark focus:border-soft-blue-dark sm:text-sm bg-soft-blue-lightest" />
          </div>
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">Link:</label>
            <input type="url" id="link" name="link" value={form.link} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-soft-blue-medium rounded-md shadow-sm focus:ring-soft-blue-dark focus:border-soft-blue-dark sm:text-sm bg-soft-blue-lightest" />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-soft-blue-dark text-white font-semibold rounded-md shadow-md hover:bg-soft-blue-darker transition duration-300"
            >
              {editingScholarship ? 'Update Scholarship' : 'Add Scholarship'}
            </button>
            {editingScholarship && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-md shadow-md hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-center text-soft-blue-medium mb-6">Current Scholarships</h3>
        {scholarships.length === 0 ? (
          <p className="text-center text-lg text-text-secondary">No scholarships to display.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((scholarship) => (
              <li key={scholarship.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-soft-blue-medium flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-soft-blue-darker mb-2">{scholarship.name}</h4>
                  <p className="text-text-secondary mb-1">Provider: {scholarship.provider}</p>
                  <p className="text-text-secondary">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mt-4">
                  <button onClick={() => handleEdit(scholarship)} className="flex-1 px-4 py-2 bg-yellow-400 text-gray-800 font-medium rounded-md shadow-sm hover:bg-yellow-500 transition duration-300">Edit</button>
                  <button onClick={() => handleDelete(scholarship.id)} className="flex-1 px-4 py-2 bg-red-400 text-white font-medium rounded-md shadow-sm hover:bg-red-500 transition duration-300">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminScholarshipPage;