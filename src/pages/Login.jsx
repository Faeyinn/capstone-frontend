import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Login() {
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
                    <div className="flex justify-center items-center bg-base-100 bg-opacity-80 rounded-lg p-8">
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" />

                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" />

                            <button className="btn btn-primary mt-4">Login</button>
                            <p className="mt-4 text-sm">
                                Belum punya akun? <Link to="/register" className="text-primary">Daftar disini</Link>
                            </p>
                        </fieldset>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Login;