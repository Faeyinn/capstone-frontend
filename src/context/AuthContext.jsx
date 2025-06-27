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
        },
        {
            id: 2,
            nama: "Beasiswa Excellence",
            jenjang: "S1",
            deadline: "30 Januari 2026",
            deskripsi: "Program beasiswa unggulan untuk mahasiswa dengan prestasi akademik tinggi dan potensi kepemimpinan yang kuat.",
            syarat: [
                "IPK minimal 3.5",
                "Prestasi akademik atau non-akademik",
                "Essay motivasi",
                "Interview online"
            ],
            benefit: [
                "Biaya kuliah penuh",
                "Tunjangan hidup bulanan",
                "Pelatihan soft skills",
                "Sertifikasi internasional"
            ],
            dokumen: [
                "Fotokopi KTP",
                "Transkrip nilai",
                "Sertifikat prestasi",
                "Essay motivasi"
            ]
        },
        {
            id: 3,
            nama: "Beasiswa Future Leaders",
            jenjang: "S1",
            deadline: "15 Februari 2026",
            deskripsi: "Beasiswa untuk calon pemimpin masa depan dengan fokus pada pengembangan karakter dan kemampuan kepemimpinan.",
            syarat: [
                "Pengalaman kepemimpinan",
                "Aktif dalam kegiatan sosial",
                "Interview dan assessment",
                "Komitmen program mentoring"
            ],
            benefit: [
                "Full scholarship",
                "Program mentoring eksklusif",
                "Networking dengan alumni",
                "Leadership development program"
            ],
            dokumen: [
                "CV lengkap",
                "Portfolio kepemimpinan",
                "Surat rekomendasi",
                "Video presentasi"
            ]
        }
    ]);

    const login = (role) => {
        setIsAuthenticated(true);
        setUserRole(role);
        console.log(`User logged in as: ${role}`);
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