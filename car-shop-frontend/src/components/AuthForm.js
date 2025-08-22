// src/components/AuthForm.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthForm = ({ formType, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isLogin = formType === 'login';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 space-y-6 bg-card-bg rounded-xl shadow-lg"
            >
                <h1 className="text-3xl font-black text-center text-dark-text">
                    {isLogin ? 'Welcome Back' : 'Create an Account'}
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <input
                            type="text" name="username" placeholder="Username"
                            onChange={handleChange} required disabled={loading}
                            className="w-full px-4 py-3 bg-light-bg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:opacity-50"
                        />
                    )}
                    <input
                        type="email" name="email" placeholder="Email Address"
                        onChange={handleChange} required disabled={loading}
                        className="w-full px-4 py-3 bg-light-bg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:opacity-50"
                    />
                    <div className="relative">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            onChange={handleChange} required disabled={loading}
                            className="w-full px-4 py-3 bg-light-bg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:opacity-50 pr-10"
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-3 text-secondary-text hover:text-dark-text">
                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {!isLogin && (
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleChange} required disabled={loading}
                                className="w-full px-4 py-3 bg-light-bg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:opacity-50 pr-10"
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-3 text-secondary-text hover:text-dark-text">
                                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    )}
                    
                    <button type="submit" disabled={loading} className="w-full py-3 font-bold text-white bg-primary-red rounded-md hover:bg-red-700 transition-colors disabled:bg-red-900 disabled:cursor-not-allowed">
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>

                <div className="text-center text-secondary-text">
                    {isLogin ? (
                        <p>Don't have an account? <Link to="/register" className="font-medium text-primary-red hover:underline">Register</Link></p>
                    ) : (
                        <p>Already have an account? <Link to="/login" className="font-medium text-primary-red hover:underline">Login</Link></p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthForm;