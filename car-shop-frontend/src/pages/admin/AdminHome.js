// src/pages/admin/AdminHome.jsx

import { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaUsers, FaPlus, FaCar } from 'react-icons/fa'; // Added FaCar
import toast from 'react-hot-toast';

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
    const [stats, setStats] = useState({ productCount: 0, userCount: 0, carCount: 0, recentCars: [] });
    const [loading, setLoading] = useState(true);
    const { token } = useCart();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                // We'll update the backend to send back car stats
                const { data } = await api.get('/api/admin/stats', config);
                setStats(data);
            } catch (error) {
                toast.error("Could not load dashboard data.");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;

    return (
        <div className="p-4 md:p-8 space-y-8">
            <h1 className="text-3xl font-black text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Cars Listed" value={stats.carCount} icon={<FaCar />} color="bg-blue-500/20 text-blue-400" />
                <StatCard title="Total Spare Parts" value={stats.productCount} icon={<FaBoxOpen />} color="bg-purple-500/20 text-purple-400" />
                <StatCard title="Total Users" value={stats.userCount} icon={<FaUsers />} color="bg-green-500/20 text-green-400" />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link to="/admin/cars" className="flex items-center gap-2 bg-primary-red text-white font-bold py-3 px-5 rounded-md hover:bg-red-700">
                        <FaPlus /> Manage Cars
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-3 px-5 rounded-md hover:bg-gray-300">
                        Manage Spare Parts
                    </Link>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Recently Added Cars</h2>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {stats.recentCars.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {stats.recentCars.map(car => (
                                <li key={car._id} className="p-4 flex justify-between items-center">
                                    <span className="font-semibold text-gray-800">{car.year} {car.make} {car.model}</span>
                                    <span className="text-gray-500">{car.price.toLocaleString('fr-FR')} FCFA</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-4 text-gray-500">No recent cars found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;