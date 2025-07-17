import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

function Beranda() {
  return (
    <div
      className="hero min-h-screen bg-base-100"
      style={{
        backgroundImage:
          "url(https://ik.imagekit.io/xf0h05qpxc/Unand.jpg?updatedAt=1750638177955)",
      }}
    >
      <div className="hero-overlay"></div>
      <motion.div
        className="hero-content text-neutral-content text-center"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          <motion.h1
            className="mb-5 text-5xl font-bold"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            Selamat Datang di ScholarMatch <br />
          </motion.h1>
          <motion.p
            className="mb-5 font-semibold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            ScholarMatch adalah paltform untuk mencari beasiswa yang mudah dan cepat. ScholarMatch membantu kamu menemukan beasiswa yang sesuai dengan kebutuhanmu.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <Link to="/login" className="btn btn-primary">Get Started</Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Beranda;