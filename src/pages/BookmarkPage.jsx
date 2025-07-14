import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function BookmarkPages() {
    const navigate = useNavigate();
    const { beasiswaList, bookmarkedScholarshipIds, toggleBookmark } = useAuth();

    const handleBack = () => {
        navigate(-1);
    };

    const bookmarkedScholarships = beasiswaList.filter(beasiswa =>
        bookmarkedScholarshipIds.includes(beasiswa.id)
    );

    return (
        <div className="hero min-h-screen">
            <div className="hero-content w-screen flex-col justify-center p-4">
                <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
                    <h1 className="mb-8 text-5xl text-center text-primary font-bold lg:text-left">Daftar Bookmark</h1>
                    <div className="w-full flex justify-start lg:justify-start">
                        <button onClick={handleBack} className="btn btn-accent">Back</button>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="card w-screen bg-white shadow-lg rounded-lg p-6">
                        <div className="card-body p-0">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar beasiswa yang di-bookmark:</h2>

                            <div className="grid grid-cols-1 gap-6">
                                {bookmarkedScholarships.length > 0 ? (
                                    bookmarkedScholarships.map((beasiswa) => (
                                        <div key={beasiswa.id} className="card bg-base-100 shadow-xl border border-gray-200">
                                            <div className="card-body p-4">
                                                <h3 className="card-title text-gray-800 text-lg mb-2">{beasiswa.nama}</h3>
                                                <p className="text-gray-600 text-sm">Jenjang: {beasiswa.jenjang}</p>
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
                                                        className="btn btn-outline btn-error btn-sm"
                                                    >
                                                        Unbookmark
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 text-center col-span-full">Belum ada beasiswa yang di-bookmark.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookmarkPages;