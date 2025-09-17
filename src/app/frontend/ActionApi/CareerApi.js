import axios from 'axios';

const BASE_URL = process.env.BASE_URL; // Make sure this points to your backend server

// Fetch all careers
export const getAllCareers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/careers`);
        return response.data.data; // assuming backend returns { success, data }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw error;
    }
};

// Fetch a single career by ID
export const getCareerById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/careers/${id}`);
        return response.data.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw error;
    }
};