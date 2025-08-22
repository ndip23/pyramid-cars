// src/utils/axiosConfig.js

import axios from 'axios';
import toast from 'react-hot-toast';

// A placeholder for the logout function
let globalLogout = () => {
  console.error("Logout function has not been initialized.");
};

export const setGlobalLogout = (logout) => {
  globalLogout = logout;
};

// Create a new instance of axios
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

// ===================================================================
//                        --- THE FIX IS HERE ---
// This is a REQUEST interceptor. It runs BEFORE every request is sent.
// ===================================================================
api.interceptors.request.use(
    (config) => {
        // Get the token from localStorage on every request
        const token = localStorage.getItem('token');
        
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config; // Continue with the request
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);


// This is the RESPONSE interceptor. It runs AFTER every response is received.
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            if (localStorage.getItem('token')) {
                toast.error("Your session has expired. Please log in again.");
            }
            globalLogout();
        }
        return Promise.reject(error);
    }
);

export default api;