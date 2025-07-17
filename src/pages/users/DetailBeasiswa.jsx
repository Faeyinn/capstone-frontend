import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTransition from "../../components/PageTransition";
import Swal from 'sweetalert2';

export default function DetailBeasiswa() {
    const { id } = useParams();
    const [beasiswa, setBeasiswa] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://20.255.58.218:3100/api/scholarships/${id}`);
                if (!res.ok) {
                    console.error("API response:", res.status, await res.text());
                    throw new Error("Gagal mengambil data detail beasiswa");
                }
                const data = await res.json();
                setBeasiswa(data);
            } catch (err) {
                console.error("DETAIL ERROR:", err);
                setBeasiswa(null);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <PageTransition>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-xl">Memuat detail beasiswa...</p>
                </div>
            </PageTransition>
        );
    }

    if (!beasiswa) {
        return (
            <PageTransition>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-xl text-red-600">Beasiswa tidak ditemukan</p>
                </div>
            </PageTransition>
        );
    }

    const requirements = beasiswa.requirements ? beasiswa.requirements.split('\n') : ["(Tidak ada persyaratan)"];
    const documents = beasiswa.documents ? beasiswa.documents.split('\n') : ["(Tidak ada dokumen)"];
    const benefit = beasiswa.benefit ? beasiswa.benefit.split('\n') : ["(Tidak ada informasi manfaat)"];

    return (
        <PageTransition>
            <div className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-primary mb-6">{beasiswa.name}</h1>
                <p className="mb-2">🏤 <strong>Penyedia:</strong> {beasiswa.provider}</p>
                <p className="mb-2">📅 <strong>Deadline:</strong> {new Date(beasiswa.deadline).toLocaleDateString()}</p>
                <p className="mb-2">
                    🎓 <strong>Status:</strong>{" "}
                    <span className={beasiswa.status === "Available" ? "text-green-600" : "text-red-600"}>
                        {beasiswa.status}
                    </span>
                </p>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">📝 Deskripsi:</h2>
                    <p className="mb-4">{beasiswa.description}</p>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">📌 Persyaratan:</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        {requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">📄 Dokumen yang Diperlukan:</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        {documents.map((doc, index) => (
                            <li key={index}>{doc}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">🎁 Benefit:</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        {benefit.map((b, index) => (
                            <li key={index}>{b}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-8">
                    <button 
                        type="button" 
                        className="btn btn-primary w-full"
                        onClick={() => 
                            Swal.fire({
                                title: 'Maaf!',
                                text: 'Fitur daftar belum tersedia sekarang!',
                                icon: 'error',
                                timer: 2000,
                                showConfirmButton: false
                            })
                        }>
                        Daftar Sekarang
                    </button>
                    <Link to="/list-beasiswa" className="btn w-full mt-2">Kembali</Link>
                </div>
            </div>
        </PageTransition>
    );
}