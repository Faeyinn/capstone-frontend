import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Ensure this matches your backend

export const registerUser = async (name, email, password, role) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password, role });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const verifyToken = async (token) => {
    const response = await axios.get(`${API_URL}/verify-token`, { // You'll need to add this endpoint to your backend
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// This function needs a corresponding backend endpoint to verify token validity and user role
// In your authMiddleware.js, you save req.user. You can create a simple route in authRoutes.js to return req.user
// Example new route in authRoutes.js:
// router.get('/verify-token', verifyToken, (req, res) => {
//   res.json({ message: 'Token is valid', user: req.user });
// });