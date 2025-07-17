import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/PageTransition'

function DetailBeasiswa() {
    const { id } = useParams();
    const { beasiswaList, bookmarkedScholarshipIds, toggleBookmark } = useAuth();

    const beasiswa = beasiswaList.find(b => b.id === parseInt(id));

    const isBookmarked = beasiswa ? bookmarkedScholarshipIds.includes(beasiswa.id) : false;

    if (!beasiswa) {
        return (
            <PageTransition>
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Beasiswa Tidak Ditemukan</h1>
                        <Link to="/list-beasiswa" className="btn btn-primary">Kembali ke Daftar Beasiswa</Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="hero min-h-screen">
                <div className="hero-content text-black">
                    <div className="container mx-auto px-4">
                        <h1 className="mt-8 mb-8 text-5xl text-center text-primary font-bold">Detail Beasiswa</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="card bg-primary shadow-xl">
                                    <div className='m-4 flex justify-between items-center'>
                                        <Link to="/list-beasiswa" className="btn btn-accent">Back</Link>
                                        <button
                                            onClick={() => toggleBookmark(beasiswa.id)}
                                            className={`btn btn-sm ${isBookmarked ? 'btn-warning' : 'btn-outline btn-info'}`}
                                        >
                                            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.519 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.519-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" /></svg>
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title text-3xl">{beasiswa.nama}</h1>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <span className="font-semibold">Jenjang:</span>
                                                <span className="ml-2">{beasiswa.jenjang}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold">Deadline:</span>
                                                <span className="ml-2">{beasiswa.deadline}</span>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Deskripsi</h2>
                                            <p className="leading-relaxed">{beasiswa.deskripsi}</p>
                                        </div>

                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Persyaratan</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {beasiswa.syarat.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Manfaat</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {beasiswa.benefit.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-3">Dokumen yang Diperlukan</h2>
                                            <ul className="list-disc list-inside space-y-2">
                                                {beasiswa.dokumen.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title mb-4">Aksi Cepat</h2>

                                        <div className="space-y-3">
                                            <button className="btn btn-primary w-full">
                                                Daftar Sekarang
                                            </button>
                                        </div>

                                        <div className="divider"></div>

                                        <div className="space-y-2">
                                            <h3 className="font-semibold">Informasi Penting:</h3>
                                            <div className="text-sm">
                                                <p className="mb-2">📅 <strong>Deadline:</strong> {beasiswa.deadline}</p>
                                                <p className="mb-2">🎓 <strong>Jenjang:</strong> {beasiswa.jenjang}</p>
                                                <p className="mb-2">📋 <strong>Status:</strong> <span className="text-green-600">Buka</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

export default DetailBeasiswa;