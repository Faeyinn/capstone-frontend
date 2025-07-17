import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

function Beranda() {
  return (
    <PageTransition>
      <div
        className="hero min-h-screen bg-base-100"
        style={{
          backgroundImage:
            "url(https://ik.imagekit.io/xf0h05qpxc/Unand.jpg?updatedAt=1750638177955)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Selamat Datang di ScholarMatch <br /> </h1>
            <p className="mb-5 font-semibold">
              ScholarMatch adalah paltform untuk mencari beasiswa yang mudah dan cepat. ScholarMatch membantu kamu menemukan beasiswa yang sesuai dengan kebutuhanmu.
            </p>
            <Link to="/login" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Beranda;