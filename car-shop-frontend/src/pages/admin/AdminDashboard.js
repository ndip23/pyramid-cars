// src/pages/admin/AdminDashboard.jsx

import { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { FaTachometerAlt,  FaCar, FaBars, FaTimes, FaArrowLeft } from 'react-icons/fa';

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const activeLink = 'bg-red-600 text-white shadow-md';
    const normalLink = 'text-gray-300 hover:bg-gray-800 hover:text-white';

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Function to close sidebar when a link is clicked (Mobile UX)
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row relative">
            
            {/* --- MOBILE HEADER (Visible only on small screens) --- */}
            <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center shadow-md z-20 sticky top-0">
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* --- SIDEBAR --- */}
            {/* 
                - Mobile: Fixed position, z-index high, slides in/out using translate
                - Desktop: Relative position, always visible, no translation 
            */}
            <aside className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 md:flex-shrink-0
            `}>
                <div className="p-6">
                    <h2 className="text-2xl font-black text-center mb-8 tracking-wider hidden md:block">ADMIN PANEL</h2>
                    
                    <nav className="space-y-3">
                        <NavLink 
                            to="/admin/dashboard" 
                            end 
                            onClick={closeSidebar}
                            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? activeLink : normalLink}`}
                        >
                            <FaTachometerAlt className="text-xl" />
                            <span className="font-medium">Dashboard</span>
                        </NavLink>

                       {/* <NavLink 
                            to="/admin/products" 
                            onClick={closeSidebar}
                            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? activeLink : normalLink}`}
                        >
                            <FaBoxOpen className="text-xl" />
                            <span className="font-medium">Spare Parts</span>
                        </NavLink>*/}

                        <NavLink 
                            to="/admin/cars" 
                            onClick={closeSidebar}
                            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? activeLink : normalLink}`}
                        >
                            <FaCar className="text-xl" />
                            <span className="font-medium">Cars</span>
                        </NavLink>
                    </nav>

                    <div className="mt-10 pt-10 border-t border-gray-700">
                        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <FaArrowLeft /> Back to Website
                        </Link>
                    </div>
                </div>
            </aside>

            {/* --- OVERLAY (Mobile only - closes menu when clicking outside) --- */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-grow p-4 md:p-8 overflow-x-hidden w-full">
                {/* Child routes (Dashboard, Cars, Products) render here */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;