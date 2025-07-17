import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/PageTransition';

function EditBeasiswa() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { beasiswaList, editBeasiswa } = useAuth();

    const beasiswa = beasiswaList.find(b => b.id === parseInt(id));

    const [editFormData, setEditFormData] = useState({
        id: null,
        name: "",
        provider: "",
        deadline: "",
        description: "",
        requirements: "",
        documents: "",
        benefit: ""
    });

    useEffect(() => {
        if (beasiswa) {
            setEditFormData({
                id: beasiswa.id,
                name: beasiswa.name,
                provider: beasiswa.provider,
                deadline: beasiswa.deadline,
                description: beasiswa.description,
                requirements: beasiswa.requirements,
                documents: beasiswa.documents,
                benefit: beasiswa.benefit || ""
            });
        } else {
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

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        const success = await editBeasiswa(editFormData);
        if (success) {
            Swal.fire({
                title: "Sukses!",
                text: "Beasiswa berhasil diupdate!",
                icon: "success"
            }).then(() => {
                navigate('/beranda-admin');
            });
        } else {
            Swal.fire({
                title: "Gagal!",
                text: "Gagal mengedit beasiswa.",
                icon: "error"
            });
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!beasiswa) {
        return (
            <PageTransition>
                <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-xl text-gray-700 ml-4">Memuat data beasiswa...</p>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content flex-col lg:flex-row-reverse w-full">
                    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold text-primary">Edit Beasiswa</h1>
                            <button onClick={handleBack} className="btn btn-accent">Kembali</button>
                        </div>
                        <form onSubmit={handleSaveEdit} className="space-y-4">
                            <div>
                                <label className="label text-black font-semibold">Nama Beasiswa</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input input-bordered w-full bg-base-100 text-black"
                                    value={editFormData.name}
                                    onChange={handleEditFormChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label text-black font-semibold">Penyedia Beasiswa</label>
                                <input
                                    type="text"
                                    name="provider"
                                    className="input input-bordered w-full bg-base-100 text-black"
                                    value={editFormData.provider}
                                    onChange={handleEditFormChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label text-black font-semibold">Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    className="input input-bordered w-full bg-base-100 text-black"
                                    value={editFormData.deadline}
                                    onChange={handleEditFormChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label text-black font-semibold">Deskripsi Singkat</label>
                                <textarea
                                    name="description"
                                    className="textarea textarea-bordered w-full bg-base-100 text-black"
                                    value={editFormData.description}
                                    onChange={handleEditFormChange}
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="label text-black font-semibold">Persyaratan (pisahkan dengan enter)</label>
                                <textarea
                                    name="requirements"
                                    className="textarea textarea-bordered w-full bg-base-100 text-black"
                                    value={editFormData.requirements}
                                    onChange={handleEditFormChange}
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="label text-black font-semibold">Dokumen (pisahkan dengan enter)</label>
                                <textarea
                                    name="documents"
                                    className="textarea textarea-bordered w-full bg-base-100 text-black"
                                    value={editFormData.documents}
                                    onChange={handleEditFormChange}
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="label text-black font-semibold">Benefit (pisahkan dengan enter)</label>
                                <textarea
                                    name="benefit"
                                    className="textarea textarea-bordered w-full bg-base-100 text-black"
                                    value={editFormData.benefit}
                                    onChange={handleEditFormChange}
                                ></textarea>
                            </div>
                            <div className="flex flex-col gap-3 mt-6">
                                <button type="submit" className="btn btn-success w-full">Simpan Perubahan</button>
                                <button type="button" onClick={handleBack} className="btn w-full">Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

export default EditBeasiswa;