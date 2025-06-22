// src/App.jsx
import './index.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Beranda from './pages/Beranda.jsx';
import ScholarshipList from './pages/ScholarshipList.jsx';
import ScholarshipDetail from './pages/ScholarshipDetail.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import ProtectedRoute

function App() {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route path="/scholarships" element={<ScholarshipList />} />
      <Route path="/scholarships/:id" element={<ScholarshipDetail />} />
      
      {/* Protected Admin Route */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;