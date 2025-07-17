import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/PageTransition'

function AddBeasiswa() {
    const navigate = useNavigate();
    const { addBeasiswa } = useAuth();

    // State sesuai field backend
    const [newBeasiswa, setNewBeasiswa] = useState({
        name: "",
        provider: "",
        deadline: "",
        description: "",
        requirements: "",
        documents: "",
        benefit: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBeasiswa(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addBeasiswa(newBeasiswa);
        if (success) {
            setNewBeasiswa({
                name: "",
                provider: "",
                deadline: "",
                description: "",
                requirements: "",
                documents: "",
                benefit: ""
            });
            Swal.fire({
                title: "Sukses!",
                text: "Beasiswa berhasil ditambahkan!",
                icon: "success"
            }).then(() => {
                navigate('/beranda-admin');
            });
        } else {
            Swal.fire({
                title: "Gagal!",
                text: "Gagal menambah beasiswa.",
                icon: "error"
            });
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <PageTransition>
            <div className="hero min-h-screen">
                <div className="hero-content text-neutral-content">
                    <div className="max-w-4xl mx-auto p-6">
                        <h1 className="mt-8 mb-8 text-5xl text-center text-primary font-bold">Tambah Beasiswa Baru</h1>
                        <div className="bg-primary rounded-lg shadow-lg p-8">
                            <button onClick={handleBack} className="btn btn-accent mb-4">Back</button>
                            <fieldset className="fieldset bg-white shadow-xl rounded-box w-full max-w-lg border p-4">
                                <h2 className="text-xl text-black font-bold mb-4 text-center">Isi Detail Beasiswa</h2>
                                <form onSubmit={handleSubmit}>
                                    <label className="label text-black">Nama Beasiswa</label>
                                    <input type="text" name="name" className="input bg-white text-black border-gray-400 w-full" placeholder="Nama Beasiswa" value={newBeasiswa.name} onChange={handleInputChange} required />

                                    <label className="label text-black">Penyedia Beasiswa</label>
                                    <input type="text" name="provider" className="input bg-white text-black border-gray-400 w-full" placeholder="Contoh: Kementerian Pendidikan" value={newBeasiswa.provider} onChange={handleInputChange} required />

                                    <label className="label text-black">Deadline</label>
                                    <input type="date" name="deadline" className="input bg-white text-black border-gray-400 w-full" value={newBeasiswa.deadline} onChange={handleInputChange} required />

                                    <label className="label text-black">Deskripsi Singkat</label>
                                    <textarea name="description" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Deskripsi Singkat tentang beasiswa ini..." value={newBeasiswa.description} onChange={handleInputChange} required></textarea>

                                    <label className="label text-black">Persyaratan (pisahkan dengan enter)</label>
                                    <textarea name="requirements" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Syarat 1&#10;Syarat 2" value={newBeasiswa.requirements} onChange={handleInputChange} required></textarea>

                                    <label className="label text-black">Dokumen (pisahkan dengan enter)</label>
                                    <textarea name="documents" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Dokumen 1&#10;Dokumen 2" value={newBeasiswa.documents} onChange={handleInputChange} required></textarea>

                                    <label className="label text-black">Benefit (pisahkan dengan enter)</label>
                                    <textarea name="benefit" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Benefit 1&#10;Benefit 2" value={newBeasiswa.benefit} onChange={handleInputChange}></textarea>

                                    <button type="submit" className="btn btn-success mt-4 w-full">Tambah Beasiswa</button>
                                    <button type="button" onClick={handleBack} className="btn mt-2 w-full">Batal</button>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

export default AddBeasiswa;