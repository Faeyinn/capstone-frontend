import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ListBeasiswa() {
    const { beasiswaList } = useAuth(); 

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content text-neutral-content">
                    <div className="w-2xl lg:w-3xl mx-auto p-6">
                        <h1 className="mb-8 text-5xl text-center text-primary font-bold">Daftar Beasiswa</h1>
                        <div className="gap-8">
                            {beasiswaList.map((beasiswa) => (
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
        </div>
    )
}

export default ListBeasiswa;