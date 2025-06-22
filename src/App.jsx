// src/App.jsx
import './index.css';
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'; // <--- Add Outlet here
import Beranda from './pages/Beranda.jsx';
import ScholarshipList from './pages/ScholarshipList.jsx';
import ScholarshipDetail from './pages/ScholarshipDetail.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Routes>
      {/* Routes without Navbar and Footer (e.g., Auth pages) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes that will always have Navbar and Footer */}
      <Route
        element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Outlet /> {/* Renders the matched child route */}
            </main>
            <Footer />
          </div>
        }
      >
        <Route path="/" element={<Beranda />} />
        <Route path="/scholarships" element={<ScholarshipList />} />
        <Route path="/scholarships/:id" element={<ScholarshipDetail />} />

        {/* Protected Admin Route */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;