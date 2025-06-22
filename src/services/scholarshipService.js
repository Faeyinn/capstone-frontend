import axios from 'axios';

const API_URL = 'http://localhost:3000/api/scholarships'; // Ensure this matches your backend

const getToken = () => localStorage.getItem('token');

export const getAllScholarships = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getScholarshipById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createScholarship = async (scholarshipData) => {
  const response = await axios.post(API_URL, scholarshipData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const updateScholarship = async (id, scholarshipData) => {
  const response = await axios.put(`${API_URL}/${id}`, scholarshipData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const deleteScholarship = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};