// src/api.staff.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/workspace/';

const getBookings = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    getBookings,
};
