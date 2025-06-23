import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Beranda() {
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
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to ScholarMatch</h1>
            <p className="mb-5">
              ScholarMatch adalah paltform untuk mencari beasiswa yang mudah dan cepat. ScholarMatch membantu kamu menemukan beasiswa yang sesuai dengan kebutuhanmu.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Beranda;