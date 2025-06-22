import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'; // Remove BrowserRouter as Router
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ScholarshipListPage from './pages/ScholarshipListPage';
import ScholarshipDetailPage from './pages/ScholarshipDetailPage';
import AdminScholarshipPage from './pages/AdminScholarshipPage';
import { verifyToken } from './services/authService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token)
        .then(response => {
          setIsAuthenticated(true);
          if (response.user && response.user.role === 'admin') {
            setIsAdmin(true);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setIsAdmin(false);
        });
    }
  }, []);

  const handleLoginSuccess = (token, role) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    if (role === 'admin') {
      setIsAdmin(true);
    }
    navigate('/scholarships');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={handleLogout} />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/scholarships" element={<ScholarshipListPage isAuthenticated={isAuthenticated} isAdmin={isAdmin} />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetailPage />} />
          {isAdmin && (
            <Route path="/admin/scholarships" element={<AdminScholarshipPage />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-3xl font-bold text-soft-blue-darker mb-4">404 - Page Not Found</h2>
      <p className="text-lg text-text-secondary mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="inline-block px-6 py-3 bg-soft-blue-dark text-white font-semibold rounded-md shadow-md hover:bg-soft-blue-darker transition duration-300">Go to Home</Link>
    </div>
  );
}

export default App;