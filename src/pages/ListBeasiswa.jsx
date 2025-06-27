import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function ListBeasiswa() {
    const { beasiswaList } = useAuth(); // Ambil beasiswaList dari context

    return (
        <div>
            <Navbar />
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://ik.imagekit.io/xf0h05qpxc/Unand.jpg?updatedAt=1750638177955)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content">
                    <div className="max-w-7xl mx-auto p-6">
                        <h1 className="mb-8 text-5xl text-center font-bold">Daftar Beasiswa</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {beasiswaList.map((beasiswa) => ( // Gunakan beasiswaList dari context
                                <div key={beasiswa.id} className="card bg-white shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title text-gray-800">{beasiswa.nama}</h2>
                                        <p className="text-gray-600">Jenjang Pendidikan: {beasiswa.jenjang}</p>
                                        <p className="text-gray-600">Deadline: {beasiswa.deadline}</p>
                                        <div className="card-actions justify-end">
                                            <Link
                                                to={`/detail-beasiswa/${beasiswa.id}`}
                                                className="btn btn-primary"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ListBeasiswa;