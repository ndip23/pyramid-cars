// src/pages/RegisterPage.jsx

import { useState } from 'react';
import api from '../utils/axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthForm from '../components/AuthForm.js';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (formData) => {
        setLoading(true);
        try {
            const { data } = await api.post('/api/auth/register', formData);
            toast.success(data.message);
            navigate('/login');
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return <AuthForm formType="register" onSubmit={handleRegister} loading={loading} />;
};

export default RegisterPage;