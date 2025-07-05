import React, { createContext, useState, useContext } from 'react';
import { Children } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    // Pindahkan data beasiswa ke state global
    const [beasiswaList, setBeasiswaList] = useState([
        {
            id: 1,
            nama: "Beasiswa SmartPath",
            jenjang: "S1",
            deadline: "25 Desember 2025",
            deskripsi: "Beasiswa SmartPath adalah program beasiswa yang ditujukan untuk mahasiswa berprestasi yang memiliki potensi untuk menjadi pemimpin masa depan. Program ini menyediakan dukungan penuh untuk pendidikan tinggi.",
            syarat: [
                "IPK minimal 3.0",
                "Aktif dalam organisasi kemahasiswaan",
                "Surat rekomendasi dari dosen",
                "Essay motivasi",
                "Tidak sedang menerima beasiswa lain"
            ],
            benefit: [
                "Biaya kuliah penuh selama 4 tahun",
                "Uang saku bulanan Rp 2.000.000",
                "Laptop dan peralatan study",
                "Program mentoring",
                "Kesempatan magang di perusahaan partner"
            ],
            dokumen: [
                "Fotokopi KTP",
                "Transkrip nilai terbaru",
                "Surat keterangan tidak mampu",
                "Essay motivasi (max 500 kata)",
                "Surat rekomendasi dari dosen"
            ]
        }
    ]);

    // Tambahkan data pengguna dummy di sini
    const users = [
        { email: 'halo@admin.com', password: 'adminpassword', role: 'admin' },
        { email: 'halo@user.com', password: 'userpassword', role: 'user' },
        { email: 'desfriemilda13@gmail.com', password: 'aaaa', role: 'admin' },
    ];

    const login = (email, password) => { // Menerima email dan password
        const foundUser = users.find(user => user.email === email && user.password === password);
        if (foundUser) {
            setIsAuthenticated(true);
            setUserRole(foundUser.role);
            console.log(`User logged in as: ${foundUser.role}`);
            return true; // Login berhasil
        } else {
            console.log('Login failed: Invalid email or password');
            return false; // Login gagal
        }
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        console.log('user logged out');
    }

    // Fungsi untuk menambah beasiswa
    const addBeasiswa = (newBeasiswa) => {
        setBeasiswaList((prevList) => [
            ...prevList,
            { ...newBeasiswa, id: prevList.length > 0 ? Math.max(...prevList.map(b => b.id)) + 1 : 1 }
        ]);
    };

    // Fungsi untuk mengedit beasiswa
    const editBeasiswa = (updatedBeasiswa) => {
        setBeasiswaList((prevList) =>
            prevList.map((beasiswa) =>
                beasiswa.id === updatedBeasiswa.id ? updatedBeasiswa : beasiswa
            )
        );
    };

    // Fungsi untuk menghapus beasiswa
    const deleteBeasiswa = (id) => {
        setBeasiswaList((prevList) => prevList.filter((beasiswa) => beasiswa.id !== id));
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, beasiswaList, addBeasiswa, editBeasiswa, deleteBeasiswa }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
        return useContext(AuthContext);
}