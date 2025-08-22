// src/pages/LoginPage.jsx

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/AuthForm.js';
import api from '../utils/axiosConfig.js';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext.js';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useCart();
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (formData) => {
        setLoading(true);
        try {
            const { data } = await api.post('/api/auth/login', {
                email: formData.email,
                password: formData.password
            });
            toast.success(data.message);
            login(data.user, data.token);
            navigate(from, { replace: true });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return <AuthForm formType="login" onSubmit={handleLogin} loading={loading} />;
};

export default LoginPage;