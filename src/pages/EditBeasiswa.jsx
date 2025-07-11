// src/pages/EditBeasiswa.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

function EditBeasiswa() {
    const { id } = useParams(); // Mengambil ID dari URL
    const navigate = useNavigate();
    const { beasiswaList, editBeasiswa } = useAuth();

    // Temukan beasiswa berdasarkan ID
    const beasiswa = beasiswaList.find(b => b.id === parseInt(id));

    const [editFormData, setEditFormData] = useState({
        id: null,
        nama: "",
        jenjang: "",
        deadline: "",
        deskripsi: "",
        syarat: "",
        benefit: "",
        dokumen: ""
    });

    useEffect(() => {
        if (beasiswa) {
            setEditFormData({
                id: beasiswa.id,
                nama: beasiswa.nama,
                jenjang: beasiswa.jenjang,
                deadline: beasiswa.deadline,
                deskripsi: beasiswa.deskripsi,
                syarat: beasiswa.syarat.join(', '),
                benefit: beasiswa.benefit.join(', '),
                dokumen: beasiswa.dokumen.join(', ')
            });
        } else {
            // Jika beasiswa tidak ditemukan (misalnya, ID di URL salah), kembali ke halaman admin
            Swal.fire({
                icon: 'error',
                title: 'Beasiswa tidak ditemukan!',
                text: 'Mengarahkan kembali ke halaman admin.',
            });
            navigate('/beranda-admin');
        }
    }, [beasiswa, navigate]);

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveEdit = (e) => {
        e.preventDefault(); // Mencegah refresh halaman
        const updatedBeasiswa = {
            id: editFormData.id,
            nama: editFormData.nama,
            jenjang: editFormData.jenjang,
            deadline: editFormData.deadline,
            deskripsi: editFormData.deskripsi,
            syarat: editFormData.syarat.split(',').map(item => item.trim()).filter(item => item !== ''),
            benefit: editFormData.benefit.split(',').map(item => item.trim()).filter(item => item !== ''),
            dokumen: editFormData.dokumen.split(',').map(item => item.trim()).filter(item => item !== '')
        };

        editBeasiswa(updatedBeasiswa);
        Swal.fire({
            title: "Sukses!",
            text: "Beasiswa berhasil diupdate!",
            icon: "success"
        }).then(() => {
            navigate('/beranda-admin'); // Kembali ke halaman beranda admin setelah berhasil
        });
    };

    if (!beasiswa) {
        return (
            <div>
                <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-xl text-gray-700 ml-4">Memuat data beasiswa...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://ik.imagekit.io/xf0h05qpxc/Unand.jpg?updatedAt=1750638177955)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content">
                    <div className="max-w-4xl mx-auto p-6">
                        <h1 className="mt-8 mb-8 text-5xl text-center font-bold">Edit Beasiswa: {beasiswa.nama}</h1>
                        <div className="flex justify-center items-center bg-white bg-opacity-80 rounded-lg p-8">
                            <fieldset className="fieldset bg-white shadow-xl rounded-box w-full max-w-lg border p-4">
                                <h2 className="text-xl text-black font-bold mb-4 text-center">Formulir Edit</h2>
                                <form onSubmit={handleSaveEdit}>
                                    <label className="label text-black">Nama Beasiswa</label>
                                    <input type="text" name="nama" className="input bg-white text-black border-gray-400 w-full" placeholder="Nama Beasiswa" value={editFormData.nama} onChange={handleEditFormChange} required />

                                    <label className="label text-black">Jenjang Pendidikan</label>
                                    <input type="text" name="jenjang" className="input bg-white text-black border-gray-400 w-full" placeholder="Jenjang Pendidikan" value={editFormData.jenjang} onChange={handleEditFormChange} required />

                                    <label className="label text-black">Deadline</label>
                                    <input type="text" name="deadline" className="input bg-white text-black border-gray-400 w-full" placeholder="Deadline (contoh: 25 Desember 2025)" value={editFormData.deadline} onChange={handleEditFormChange} required />

                                    <label className="label text-black">Deskripsi Singkat</label>
                                    <textarea name="deskripsi" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Deskripsi Singkat" value={editFormData.deskripsi} onChange={handleEditFormChange} required></textarea>

                                    <label className="label text-black">Persyaratan (pisahkan dengan koma)</label>
                                    <textarea name="syarat" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Syarat 1, Syarat 2, ..." value={editFormData.syarat} onChange={handleEditFormChange} required></textarea>

                                    <label className="label text-black">Dokumen (pisahkan dengan koma)</label>
                                    <textarea name="dokumen" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Dokumen 1, Dokumen 2, ..." value={editFormData.dokumen} onChange={handleEditFormChange} required></textarea>

                                    <label className="label text-black">Benefit (pisahkan dengan koma)</label>
                                    <textarea name="benefit" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Benefit 1, Benefit 2, ..." value={editFormData.benefit} onChange={handleEditFormChange} required></textarea>

                                    <button type="submit" className="btn btn-success mt-4 w-full">Simpan Perubahan</button>
                                    <button type="button" onClick={() => navigate('/beranda-admin')} className="btn btn-ghost mt-2 w-full">Batal</button>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditBeasiswa;