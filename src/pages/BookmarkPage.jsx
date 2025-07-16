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
        <div className="min-h-screen bg-base-100 px-4 py-10">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-primary">Daftar Bookmark</h1>
                    <button onClick={handleBack} className="btn btn-accent">Back</button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-base-300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Beasiswa yang kamu bookmark:</h2>

                    {bookmarkedScholarships.length > 0 ? (
                        <div className="grid gap-6">
                            {bookmarkedScholarships.map((beasiswa) => (
                                <div key={beasiswa.id} className="border border-gray-200 rounded-lg p-4 bg-base-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">{beasiswa.nama}</h3>
                                    <p className="text-sm text-gray-600">Jenjang: {beasiswa.jenjang}</p>
                                    <p className="text-sm text-gray-600">Deadline: {beasiswa.deadline}</p>

                                    <div className="mt-4 flex gap-2 justify-end">
                                        <Link to={`/detail-beasiswa/${beasiswa.id}`} className="btn btn-primary btn-sm">
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
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-10">Belum ada beasiswa yang di-bookmark.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookmarkPages;
