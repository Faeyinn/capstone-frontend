import React, { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan objek user atau null
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Untuk menangani inisialisasi awal
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          // Pastikan token belum kadaluarsa
          if (decoded.exp * 1000 > Date.now()) {
            setUser(decoded); // decoded object should contain id, email, role
            setIsAuthenticated(true);
            setIsAdmin(decoded.role === 'admin');
          } else {
            // Token kadaluarsa
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('Failed to decode token or load user from local storage:', error);
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromLocalStorage();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authApi.login({ email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAuthenticated(true);
      setIsAdmin(decoded.role === 'admin');
      return { success: true, userRole: decoded.role };
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await authApi.register({ name, email, password, role });
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.error || error.message);
      return { success: false, message: error.response?.data?.error || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  if (loading) {
    return <div>Loading authentication...</div>; // Atau spinner loading
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);