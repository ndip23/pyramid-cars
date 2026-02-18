// src/pages/admin/AdminHome.jsx

import { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig.js';
import { useCart } from '../../context/CartContext.js';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaUsers, FaPlus, FaCar, FaChartLine } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Reusable Card Component for consistency
const StatCard = ({ title, value, icon, colorClass, iconBgClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:-translate-y-1">
        <div className={`p-4 rounded-full text-2xl ${iconBgClass} ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-black text-gray-800 mt-1">{value}</p>
        </div>
    </div>
);

const AdminHome = () => {
    // Default values to prevent errors before data loads
    const [stats, setStats] = useState({ 
        productCount: 0, 
        userCount: 0, 
        carCount: 0, 
        recentCars: [] 
    });
    const [loading, setLoading] = useState(true);
    const { token } = useCart();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Ensure your backend actually has this route, otherwise mock it for now
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await api.get('/api/admin/stats', config);
                setStats(data);
            } catch (error) {
                console.error("Dashboard Stats Error:", error);
                 toast.error("Could not load stats"); // Optional: suppress to avoid annoying popups
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800">Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Overview of your car shop performance</p>
                </div>
            </header>

            {/* --- STATS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Cars" 
                    value={stats.carCount || 0} 
                    icon={<FaCar />} 
                    colorClass="text-blue-600"
                    iconBgClass="bg-blue-100"
                />
                <StatCard 
                    title="Spare Parts" 
                    value={stats.productCount || 0} 
                    icon={<FaBoxOpen />} 
                    colorClass="text-purple-600"
                    iconBgClass="bg-purple-100"
                />
                <StatCard 
                    title="Registered Users" 
                    value={stats.userCount || 0} 
                    icon={<FaUsers />} 
                    colorClass="text-green-600"
                    iconBgClass="bg-green-100"
                />
            </div>

            {/* --- QUICK ACTIONS --- */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <FaChartLine className="text-gray-400"/> Quick Actions
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/admin/cars" className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors shadow-red-200 shadow-lg">
                        <FaPlus /> Manage Cars
                    </Link>
                    {/*<Link to="/admin/products" className="flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors shadow-lg">
                        <FaBoxOpen /> Manage Parts
                    </Link>*/}
                </div>
            </div>

            {/* --- RECENT ACTIVITY --- */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Recently Added Cars</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {stats.recentCars && stats.recentCars.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {stats.recentCars.map(car => (
                                    <div key={car._id} className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded text-blue-600">
                                                <FaCar />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm sm:text-base">{car.year} {car.make} {car.model}</p>
                                                <p className="text-xs text-gray-500">Listed recently</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-blue-600 text-sm sm:text-base bg-blue-50 px-3 py-1 rounded-full self-start sm:self-auto">
                                            {Number(car.price).toLocaleString('fr-FR')} FCFA
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <p>No cars added recently.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;