// src/pages/admin/AdminHome.jsx

import { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig.js';
import { useCart } from '../../context/CartContext.js';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaUsers, FaPlus, FaList } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Reusable Stat Card Component for the dashboard
const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-dark-card p-6 rounded-lg shadow-lg flex items-center gap-6`}>
        <div className={`text-4xl p-4 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-secondary-text text-sm uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-black text-light-text">{value}</p>
        </div>
    </div>
);

const AdminHome = () => {
    const [stats, setStats] = useState({ productCount: 0, userCount: 0, recentProducts: [] });
    const [loading, setLoading] = useState(true);
    const { token } = useCart();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                // Using the centralized 'api' instance
                const { data } = await api.get('/api/admin/stats', config);
                setStats(data);
            } catch (error) {
                // The interceptor will handle the logout, we just need to avoid crashing
                console.error("Could not load dashboard data:", error);
                toast.error("Could not load dashboard data.");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    if (loading) {
        return <div className="p-8 text-center text-xl text-secondary-text">Loading Dashboard...</div>;
    }

    return (
        <div className="p-4 md:p-8 space-y-8">
            <h1 className="text-3xl font-black text-light-text">Admin Dashboard</h1>

            {/* --- Stat Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Products" value={stats.productCount} icon={<FaBoxOpen />} color="bg-blue-500/20 text-blue-400" />
                <StatCard title="Total Users" value={stats.userCount} icon={<FaUsers />} color="bg-green-500/20 text-green-400" />
                {/* Future cards can be added here (e.g., for orders) */}
            </div>

            {/* --- Quick Actions --- */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-light-text">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link to="/admin/products/create" className="flex items-center gap-2 bg-primary-red text-white font-bold py-3 px-5 rounded-md hover:bg-red-700 transition-colors">
                        <FaPlus /> Add New Product
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-2 bg-dark-card text-light-text font-bold py-3 px-5 rounded-md hover:bg-gray-700 transition-colors">
                        <FaList /> Manage All Products
                    </Link>
                </div>
            </div>

            {/* --- Recent Products --- */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-light-text">Recently Added Products</h2>
                <div className="bg-dark-card rounded-lg shadow-lg overflow-hidden">
                    {stats.recentProducts.length > 0 ? (
                        <ul className="divide-y divide-gray-800">
                            {stats.recentProducts.map(product => (
                                <li key={product._id} className="p-4 flex justify-between items-center">
                                    <span className="font-semibold">{product.name}</span>
                                    <span className="text-secondary-text">${product.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-4 text-secondary-text">No recent products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;