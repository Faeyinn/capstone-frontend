import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Unand from '../assets/Unand.jpg';
import SearchBar from '../components/SearchBar';

function HeroSection() {
    const handleSearch = (filters) => {
        console.log("Filter yang dipilih:", filters);
        // Implement search logic here
    };

    return (
        <>
            <Navbar />
            <div className="hero min-h-screen relative">
                <img src={Unand} alt="Ilustrasi Mahasiswa Berprestasi" className="w-full h-full object-cover absolute inset-0 opacity-50" />
                <div className="hero-overlay bg-black bg-opacity-60"></div>
                <div className="hero-content text-center relative z-10 flex flex-col justify-between h-full">
                    <div className="flex-grow flex items-center justify-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold text-white">Welcome to ScholarMatch</h1>
                            <p className="py-6 text-white">"Temukan Beasiswa Impianmu Disini !"</p>
                            <button className="btn btn-primary mr-4">Cari Beasiswa</button>
                            <button className="btn btn-primary">Daftar Akun</button>
                        </div>
                    </div>
                    <div className="pb-10 w-full">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </div>
            <div className="bg-base-100 p-6">
                <h2 className="text-3xl font-bold text-center mb-4">Join Our Community</h2>
                <p className="text-center mb-6">Sign up to connect with mentors, access resources, and enhance your academic journey.</p>
                <div className="flex justify-center">
                    <button className="btn btn-secondary">Sign Up Now</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HeroSection;