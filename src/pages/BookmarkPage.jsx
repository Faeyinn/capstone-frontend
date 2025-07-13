import { Link } from 'react-router-dom'

function BookmarkPages() {
    return (
        <div className="container mx-auto px-4">
            <button className="btn btn-accent mb-4 mt-2">
                <Link to="/list-beasiswa">Back</Link>
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="card bg-primary shadow-xl">
                        <div className="card-body">
                            <h1 className="card-title text-3xl mb-4">Bookmark Page</h1>
                            <p className="leading-relaxed">Here you can view your bookmarked scholarships.</p>
                        </div>
                    </div>
                </div>
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card bg-secondary shadow-xl">
                        <div className="card-body">
                            <h2 className="text-2xl font-bold mb-3">Your Bookmarks</h2>
                            <ul className="list-disc list-inside space-y-2">
                                {/* Example bookmarks, replace with dynamic data */}
                                <li>Beasiswa A</li>
                                <li>Beasiswa B</li>
                                <li>Beasiswa C</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookmarkPages;