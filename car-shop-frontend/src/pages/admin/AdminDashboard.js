// src/pages/admin/AdminDashboard.jsx

import { NavLink, Link, Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaCar } from 'react-icons/fa';


const AdminDashboard = () => {
    // This component will render the child route (e.g., ProductListPage)
    // inside the <Outlet /> component.

    const activeLink = 'bg-primary-red text-white';
    const normalLink = 'hover:bg-gray-700';

    return (
        <div className="min-h-screen flex">
            {/* --- Sidebar --- */}
            <aside className="w-64 bg-card-bg p-4 flex-shrink-0">
                <h2 className="text-2xl font-black text-center mb-8">Admin Panel</h2>
                <nav className="space-y-2">
                    <NavLink to="/admin/dashboard" end className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? activeLink : normalLink}`}>
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? activeLink : normalLink}`}>
                        <FaBoxOpen />
                        <span>Products</span>
                    </NavLink>
                    <NavLink to="/admin/cars" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? activeLink : normalLink}`}>
        <FaCar />
        <span>Cars</span>
    </NavLink>
                    {/* Add more links here later, e.g., for users or orders */}
                    {/* <NavLink to="/admin/users" className={...}><FaUsers /><span>Users</span></NavLink> */}
                </nav>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-grow bg-dark-light">
                <Link to="/dashboard" className="text-secondary-text hover:text-dark-text  inline-block"> &larr; Back to Dashboard</Link>
                {/* Child routes will be rendered here */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;