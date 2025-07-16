import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

const API_BASE_URL = 'http://localhost:3100/api';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [beasiswaList, setBeasiswaList] = useState([
        {
            id: 1,
            nama: "Beasiswa SmartPath",
            jenjang: "S1",
            deadline: "2025-12-31",
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
        },
        {
            id: 2,
            nama: "Beasiswa Global Leader",
            jenjang: "S2",
            deadline: "2025-11-15",
            deskripsi: "Program untuk mahasiswa pascasarjana yang ingin berkontribusi pada isu global.",
            syarat: ["IPK min 3.5", "TOEFL min 550"],
            benefit: ["Biaya kuliah penuh", "Tunjangan hidup"],
            dokumen: ["CV", "Paspor"]
        },
        {
            id: 3,
            nama: "Beasiswa Teknologi Maju",
            jenjang: "D3",
            deadline: "2025-10-01",
            deskripsi: "Beasiswa untuk siswa/mahasiswa di bidang teknologi informasi dan rekayasa.",
            syarat: ["Lulusan SMA/SMK", "Minat di bidang teknologi"],
            benefit: ["Biaya pendidikan", "Kesempatan kerja"],
            dokumen: ["Ijazah", "Portofolio"]
        }
    ]);

    const [bookmarkedScholarshipIds, setBookmarkedScholarshipIds] = useState(() => {
        try {
            const storedBookmarks = localStorage.getItem('bookmarkedScholarshipIds');
            return storedBookmarks ? JSON.parse(storedBookmarks) : [];
        } catch (error) {
            console.error("Failed to read bookmarks from localStorage:", error);
            return [];
        }
    });

    // Gunakan useEffect untuk menyimpan bookmark ke Local Storage setiap kali berubah
    useEffect(() => {
        try {
            localStorage.setItem('bookmarkedScholarshipIds', JSON.stringify(bookmarkedScholarshipIds));
        } catch (error) {
            console.error("Failed to save bookmarks to localStorage:", error);
        }
    }, [bookmarkedScholarshipIds]);


    const users = [
        { email: 'fajar.saputra2907@gmail.com', password: 'aaaa', role: 'admin' },
        { email: 'halo@admin.com', password: 'adminpassword', role: 'admin' },
        { email: 'rahmat.fajar2907@gmail.com', password: 'aaaa', role: 'user' },
        { email: 'halo@user.com', password: 'userpassword', role: 'user' },
    ];

    const [usersState, setUsersState] = useState(users);

    const deleteUser = (email) => {
        setUsersState(prev => prev.filter(user => user.email !== email));
    };

    const login = (email, password) => {
        const foundUser = users.find(user => user.email === email && user.password === password);
        if (foundUser) {
            setIsAuthenticated(true);
            setUserRole(foundUser.role);
            console.log(`User logged in as: ${foundUser.role}`);
            return true;
        } else {
            console.log('Login failed: Invalid email or password');
            return false;
        }
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        console.log('user logged out');
    }

    const addBeasiswa = (newBeasiswa) => {
        setBeasiswaList((prevList) => [
            ...prevList,
            { ...newBeasiswa, id: prevList.length > 0 ? Math.max(...prevList.map(b => b.id)) + 1 : 1 }
        ]);
    };

    const editBeasiswa = (updatedBeasiswa) => {
        setBeasiswaList((prevList) =>
            prevList.map((beasiswa) =>
                beasiswa.id === updatedBeasiswa.id ? updatedBeasiswa : beasiswa
            )
        );
    };

    const deleteBeasiswa = (id) => {
        setBeasiswaList((prevList) => prevList.filter((beasiswa) => beasiswa.id !== id));
        // Juga hapus dari bookmark jika beasiswa yang dihapus sedang di-bookmark
        setBookmarkedScholarshipIds((prevIds) => prevIds.filter((bookmarkId) => bookmarkId !== id));
    };

    // Fungsi untuk menambah/menghapus bookmark
    const toggleBookmark = (beasiswaId) => {
        setBookmarkedScholarshipIds((prevIds) => {
            if (prevIds.includes(beasiswaId)) {
                // Jika sudah di-bookmark, hapus
                return prevIds.filter((id) => id !== beasiswaId);
            } else {
                // Jika belum di-bookmark, tambahkan
                return [...prevIds, beasiswaId];
            }
        });
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            userRole,
            login,
            logout,
            beasiswaList,
            addBeasiswa,
            editBeasiswa,
            deleteBeasiswa,
            bookmarkedScholarshipIds,
            toggleBookmark,
            users: usersState,
            deleteUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}