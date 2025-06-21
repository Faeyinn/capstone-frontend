// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
    const [scholarships, setScholarships] = useState([]);
    const [editingScholarship, setEditingScholarship] = useState(null); // State for editing
    const [form, setForm] = useState({
        id: '', // Used for update, but typically handled by backend on create
        nama: '',
        institusi: '',
        deadline: '',
        jenjang: '',
        bidang: '',
        deskripsi: ''
    });

    // Dummy scholarships for admin view
    const dummyAdminScholarships = [
        {
            id: 1,
            nama: "Beasiswa Garuda",
            institusi: "Lembaga Pengelola Dana Pendidikan",
            deadline: "31 Desember 2025",
            jenjang: "S2/S3",
            bidang: "Umum",
            deskripsi: "Deskripsi singkat Beasiswa Garuda."
        },
        {
            id: 2,
            nama: "Kampung Inggris Beasiswa",
            institusi: "Central Course",
            deadline: "5 November 2025",
            jenjang: "S1",
            bidang: "Bahasa",
            deskripsi: "Deskripsi singkat Kampung Inggris Beasiswa."
        },
    ];

    useEffect(() => {
        // In a real application, fetch admin-specific data from API
        // For now, use dummy data
        setScholarships(dummyAdminScholarships);
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddScholarship = (e) => {
        e.preventDefault();
        // In a real app, send a POST request to your backend to add the scholarship
        const newId = scholarships.length > 0 ? Math.max(...scholarships.map(s => s.id)) + 1 : 1;
        const newScholarship = { ...form, id: newId };
        setScholarships(prev => [...prev, newScholarship]);
        setForm({ id: '', nama: '', institusi: '', deadline: '', jenjang: '', bidang: '', deskripsi: '' });
        alert('Beasiswa berhasil ditambahkan!');
    };

    const handleEditClick = (scholarship) => {
        setEditingScholarship(scholarship.id);
        setForm(scholarship); // Populate form with scholarship data for editing
    };

    const handleUpdateScholarship = (e) => {
        e.preventDefault();
        // In a real app, send a PUT request to your backend to update the scholarship
        setScholarships(prev => prev.map(s => s.id === editingScholarship ? { ...form, id: editingScholarship } : s));
        setEditingScholarship(null);
        setForm({ id: '', nama: '', institusi: '', deadline: '', jenjang: '', bidang: '', deskripsi: '' });
        alert('Beasiswa berhasil diupdate!');
    };

    const handleDeleteScholarship = (id) => {
        // In a real app, send a DELETE request to your backend
        if (window.confirm("Apakah Anda yakin ingin menghapus beasiswa ini?")) {
            setScholarships(prev => prev.filter(s => s.id !== id));
            alert('Beasiswa berhasil dihapus!');
        }
    };

    // Simple authentication check (replace with actual auth logic)
    const isAdminLoggedIn = true; // Placeholder: Replace with actual auth state

    if (!isAdminLoggedIn) {
        navigate('/login'); // Redirect to login if not authenticated
        return null;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-secondary">Admin Dashboard</h1>

                {/* Form Add/Edit Scholarship */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {editingScholarship ? 'Edit Beasiswa' : 'Tambah Beasiswa Baru'}
                    </h2>
                    <form onSubmit={editingScholarship ? handleUpdateScholarship : handleAddScholarship} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="nama"
                            placeholder="Nama Beasiswa"
                            value={form.nama}
                            onChange={handleFormChange}
                            className="input input-bordered w-full bg-white text-black shadow-sm border-gray-300"
                            required
                        />
                        <input
                            type="text"
                            name="institusi"
                            placeholder="Institusi"
                            value={form.institusi}
                            onChange={handleFormChange}
                            className="input input-bordered w-full bg-white text-black shadow-sm border-gray-300"
                            required
                        />
                        <input
                            type="text"
                            name="deadline"
                            placeholder="Deadline (e.g., 31 Desember 2025)"
                            value={form.deadline}
                            onChange={handleFormChange}
                            className="input input-bordered w-full bg-white text-black shadow-sm border-gray-300"
                            required
                        />
                        <select
                            name="jenjang"
                            value={form.jenjang}
                            onChange={handleFormChange}
                            className="select select-bordered w-full bg-white text-black shadow-sm border-gray-300"
                            required
                        >
                            <option value="">Pilih Jenjang</option>
                            <option value="SMA">SMA</option>
                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                        </select>
                         <select
                            name="bidang"
                            value={form.bidang}
                            onChange={handleFormChange}
                            className="select select-bordered w-full bg-white text-black shadow-sm border-gray-300"
                            required
                        >
                            <option value="">Pilih Bidang Studi</option>
                            <option value="Teknik">Teknik</option>
                            <option value="Sains">Sains</option>
                            <option value="Sosial">Sosial</option>
                            <option value="Kedokteran">Kedokteran</option>
                            <option value="Bahasa">Bahasa</option>
                            <option value="Umum">Umum</option>
                            <option value="Multi-disiplin">Multi-disiplin</option>
                        </select>
                        <textarea
                            name="deskripsi"
                            placeholder="Deskripsi Beasiswa"
                            value={form.deskripsi}
                            onChange={handleFormChange}
                            className="textarea textarea-bordered md:col-span-2 w-full bg-white text-black shadow-sm border-gray-300"
                            rows="4"
                            required
                        ></textarea>
                        <div className="md:col-span-2 text-right">
                            <button type="submit" className="btn btn-success mr-2">
                                {editingScholarship ? 'Update Beasiswa' : 'Tambah Beasiswa'}
                            </button>
                            {editingScholarship && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingScholarship(null);
                                        setForm({ id: '', nama: '', institusi: '', deadline: '', jenjang: '', bidang: '', deskripsi: '' });
                                    }}
                                    className="btn btn-error"
                                >
                                    Batal Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Scholarship List for Admin */}
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daftar Beasiswa (Admin)</h2>
                    <table className="table w-full text-neutral text-base border-gray-200">
                        <thead className="bg-gray-100 text-neutral">
                            <tr>
                                <th>Nama Beasiswa</th>
                                <th>Institusi</th>
                                <th>Deadline</th>
                                <th>Jenjang</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scholarships.map((scholarship) => (
                                <tr key={scholarship.id}>
                                    <td>{scholarship.nama}</td>
                                    <td>{scholarship.institusi}</td>
                                    <td>{scholarship.deadline}</td>
                                    <td>{scholarship.jenjang}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(scholarship)} className="btn btn-warning btn-sm mr-2">Edit</button>
                                        <button onClick={() => handleDeleteScholarship(scholarship.id)} className="btn btn-error btn-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AdminDashboard;