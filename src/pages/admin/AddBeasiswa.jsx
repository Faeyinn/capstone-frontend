// src/pages/AddBeasiswa.jsx
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/PageTransition'

function AddBeasiswa() {
    const navigate = useNavigate();
    const { addBeasiswa } = useAuth();

    // State untuk form tambah beasiswa
    const [newBeasiswa, setNewBeasiswa] = useState({
        nama: "",
        penyedia: "",
        jenjang: "",
        deadline: "",
        deskripsi: "",
        syarat: "",
        benefit: "",
        dokumen: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBeasiswa(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const beasiswaToAdd = {
            id: Date.now(),
            nama: newBeasiswa.nama,
            penyedia: newBeasiswa.penyedia,
            jenjang: newBeasiswa.jenjang,
            deadline: newBeasiswa.deadline,
            deskripsi: newBeasiswa.deskripsi,
            syarat: newBeasiswa.syarat.split(',').map(item => item.trim()).filter(item => item !== ''),
            benefit: newBeasiswa.benefit.split(',').map(item => item.trim()).filter(item => item !== ''),
            dokumen: newBeasiswa.dokumen.split(',').map(item => item.trim()).filter(item => item !== '')
        };
        addBeasiswa(beasiswaToAdd);
        // Reset form setelah menambah
        setNewBeasiswa({
            nama: "",
            penyedia: "",
            jenjang: "",
            deadline: "",
            deskripsi: "",
            syarat: "",
            benefit: "",
            dokumen: ""
        });
        Swal.fire({
            title: "Sukses!",
            text: "Beasiswa berhasil ditambahkan!",
            icon: "success"
        }).then(() => {
            navigate('/beranda-admin');
        });
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
                                    <input type="text" name="nama" className="input bg-white text-black border-gray-400 w-full" placeholder="Nama Beasiswa" value={newBeasiswa.nama} onChange={handleInputChange} required />

                                    <label className="label text-black">Penyedia Beasiswa</label>
                                    <input type="text" name="penyedia" className="input bg-white text-black border-gray-400 w-full" placeholder="Contoh: Kementerian Pendidikan" value={newBeasiswa.penyedia} onChange={handleInputChange} />

                                    <label className="label text-black">Jenjang Pendidikan</label>
                                    <input type="text" name="jenjang" className="input bg-white text-black border-gray-400 w-full" placeholder="Contoh: S1, S2, Umum, SMA" value={newBeasiswa.jenjang} onChange={handleInputChange} required />

                                    <label className="label text-black">Deadline</label>
                                    <input type="date" name="deadline" className="input bg-white text-black border-gray-400 w-full" value={newBeasiswa.deadline} onChange={handleInputChange} required />

                                    <label className="label text-black">Deskripsi Singkat</label>
                                    <textarea name="deskripsi" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Deskripsi Singkat tentang beasiswa ini..." value={newBeasiswa.deskripsi} onChange={handleInputChange} required></textarea>

                                    <label className="label text-black">Persyaratan (pisahkan dengan koma)</label>
                                    <textarea name="syarat" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Syarat 1, Syarat 2, ..." value={newBeasiswa.syarat} onChange={handleInputChange} required></textarea>

                                    <label className="label text-black">Dokumen (pisahkan dengan koma)</label>
                                    <textarea name="dokumen" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Dokumen 1, Dokumen 2, ..." value={newBeasiswa.dokumen} onChange={handleInputChange} required></textarea>

                                    <label className="label text-black">Benefit (pisahkan dengan koma)</label>
                                    <textarea name="benefit" className="textarea bg-white text-black border-gray-400 w-full" placeholder="Benefit 1, Benefit 2, ..." value={newBeasiswa.benefit} onChange={handleInputChange} required></textarea>

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