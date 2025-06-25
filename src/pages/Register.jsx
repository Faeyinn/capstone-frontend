import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Register() {
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
                    <div className="flex justify-center items-center bg-white bg-opacity-80 rounded-lg p-8">
                        <fieldset className="fieldset bg-white shadow-xl rounded-box w-xs border p-4">
                            <h2 className="text-xl font-bold mb-4 text-center text-primary">Register</h2>

                            <label className="label text-black">Email</label>
                            <input type="email" className="input bg-white text-black border-gray-400" placeholder="Email" />

                            <label className="label text-black">Password</label>
                            <input type="password" className="input bg-white text-black border-gray-400" placeholder="Password" />

                            <label className="label text-black">Confirm Password</label>
                            <input type="password" className="input bg-white text-black border-gray-400" placeholder="Password" />

                            <button className="btn btn-primary mt-4">Register</button>
                            <p className="mt-4 text-sm text-black">
                                Sudah punya akun? <Link to="/login" className="text-primary">Login disini</Link>
                            </p>
                        </fieldset>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Register;