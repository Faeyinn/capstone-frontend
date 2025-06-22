import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Sesuaikan backend berjalan di port atau host lain

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Endpoints Otentikasi
export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Endpoints Beasiswa (Public & Admin)
export const scholarshipApi = {
  getAll: () => api.get('/scholarships'), // Untuk user dan admin melihat semua beasiswa
  getById: (id) => api.get(`/scholarships/${id}`), // Untuk user dan admin melihat detail beasiswa
  create: (data) => api.post('/scholarships', data), // Hanya admin
  update: (id, data) => api.put(`/scholarships/${id}`, data), // Hanya admin
  delete: (id) => api.delete(`/scholarships/${id}`), // Hanya admin
};

export default api;