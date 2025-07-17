import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);
const API_BASE_URL = 'http://20.255.58.218:3100/api';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const [beasiswaList, setBeasiswaList] = useState([]);
    const [bookmarkedScholarshipIds, setBookmarkedScholarshipIds] = useState(() => {
        try {
            const stored = localStorage.getItem('bookmarkedScholarshipIds');
            return stored ? JSON.parse(stored) : [];
        } catch (err) {
            console.error("Bookmark load failed:", err);
            return [];
        }
    });

    // Login
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
            const token = res.data.token;
            if (token) {
                const decoded = jwtDecode(token);
                setIsAuthenticated(true);
                setUserRole(decoded.role);
                localStorage.setItem('token', token);
                return true;
            }
            return false;
        } catch (err) {
            console.error("LOGIN ERROR:", err.response?.data || err.message);
            Swal.fire('Login Gagal', err.response?.data?.message || 'Email atau password salah', 'error');
            return false;
        }
    };

    // Register
    const register = async (email, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/register`, { email, password });
            if (res.data && res.data.user) {
                Swal.fire('Registrasi Berhasil', 'Silakan login', 'success');
                return true;
            } else {
                throw new Error("Registrasi gagal");
            }
        } catch (err) {
            console.error("REGISTER ERROR:", err.response?.data || err.message);
            Swal.fire('Registrasi Gagal', err.response?.data?.message || 'Terjadi kesalahan', 'error');
            return false;
        }
    };

    // Logout
    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setIsAuthenticated(true);
                setUserRole(decoded.role);
            } catch (err) {
                console.error("Token tidak valid:", err);
            }
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('bookmarkedScholarshipIds', JSON.stringify(bookmarkedScholarshipIds));
        } catch (error) {
            console.error("Failed to save bookmarks to localStorage:", error);
        }
    }, [bookmarkedScholarshipIds]);

    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    // Ambil data beasiswa
    useEffect(() => {
        const fetchBeasiswa = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/scholarships`);
                setBeasiswaList(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Gagal fetch beasiswa:", err);
            }
        };
        if (isAuthenticated) {
            fetchBeasiswa();
        }
    }, [isAuthenticated]);

    // Tambah beasiswa
    const addBeasiswa = async (newBeasiswa) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/scholarships`, newBeasiswa, { headers: getAuthHeader() });
            setBeasiswaList((prevList) => [...prevList, res.data]);
            return true;
        } catch (err) {
            console.error("Gagal tambah beasiswa:", err);
            return false;
        }
    };

    // Edit beasiswa
    const editBeasiswa = async (updatedBeasiswa) => {
        try {
            const res = await axios.put(
                `${API_BASE_URL}/scholarships/${updatedBeasiswa.id}`,
                updatedBeasiswa,
                { headers: getAuthHeader() }
            );
            setBeasiswaList((prevList) =>
                prevList.map((b) => (b.id === updatedBeasiswa.id ? res.data : b))
            );
            return true;
        } catch (err) {
            console.error("Gagal edit beasiswa:", err);
            return false;
        }
    };

    // Delete beasiswa
    const deleteBeasiswa = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/scholarships/${id}`, { headers: getAuthHeader() });
            setBeasiswaList((prevList) => prevList.filter((b) => b.id !== id));
            setBookmarkedScholarshipIds((prevIds) => prevIds.filter((bookmarkId) => bookmarkId !== id));
            return true;
        } catch (err) {
            console.error("Gagal hapus beasiswa:", err);
            return false;
        }
    };

    const [users, setUsers] = useState([]);

    // Ambil data user
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/users`,
                    { headers: getAuthHeader() }
                );
                setUsers(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Gagal fetch users:", err);
            }
        };
        if (isAuthenticated && userRole === 'admin') {
            fetchUsers();
        }
    }, [isAuthenticated, userRole]);

    // Hapus user di backend
    const deleteUser = async (email) => {
        try {
            await axios.delete(
                `${API_BASE_URL}/users/${email}`,
                { headers: getAuthHeader() }
            );
            setUsers((prev) => prev.filter((u) => u.email !== email));
            return true;
        } catch (err) {
            console.error("Gagal hapus user:", err);
            return false;
        }
    };

    const toggleBookmark = (beasiswaId) => {
        setBookmarkedScholarshipIds((prevIds) =>
            prevIds.includes(beasiswaId)
                ? prevIds.filter((id) => id !== beasiswaId)
                : [...prevIds, beasiswaId]
        );
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            userRole,
            login,
            logout,
            register,
            beasiswaList,
            addBeasiswa,
            editBeasiswa,
            deleteBeasiswa,
            bookmarkedScholarshipIds,
            users,
            deleteUser,
            toggleBookmark
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
