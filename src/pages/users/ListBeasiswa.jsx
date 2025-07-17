import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/PageTransition'

function ListBeasiswa() {
    const { beasiswaList, bookmarkedScholarshipIds, toggleBookmark } = useAuth();

    return (
        <PageTransition>
            <div className="hero min-h-screen">
                <div className="hero-content text-neutral-content w-full">
                    <div className="w-full mx-auto p-6">
                        <h1 className="mb-8 text-5xl text-center text-primary font-bold">Daftar Beasiswa</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {beasiswaList.map((beasiswa) => {
                                const isBookmarked = bookmarkedScholarshipIds.includes(beasiswa.id);

                                return (
                                    <div key={beasiswa.id} className="card bg-white shadow-xl">
                                        <div className="card-body p-4">
                                            <h2 className="card-title text-gray-800">{beasiswa.nama}</h2>
                                            <p className="text-gray-600 text-sm">Jenjang Pendidikan: {beasiswa.jenjang}</p>
                                            <p className="text-gray-600 text-sm">Deadline: {beasiswa.deadline}</p>
                                            <div className="card-actions justify-end mt-4">
                                                <Link
                                                    to={`/detail-beasiswa/${beasiswa.id}`}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Lihat Detail
                                                </Link>
                                                <button
                                                    onClick={() => toggleBookmark(beasiswa.id)}
                                                    className={`btn btn-sm ${isBookmarked ? 'btn-warning' : 'btn-outline btn-info'}`}
                                                >
                                                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.519 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.519-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

export default ListBeasiswa;