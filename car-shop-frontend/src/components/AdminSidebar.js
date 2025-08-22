// src/components/AdminSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-zinc-900 text-white p-6 fixed left-0 top-0">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-4">
        <Link to="/admin/add-car" className="block hover:text-gray-400">Add New Car</Link>
        <Link to="/admin/add-part" className="block hover:text-gray-400">Add New Part</Link>
        <Link to="/admin/manage-cars" className="block hover:text-gray-400">Manage Cars</Link>
        <Link to="/admin/manage-parts" className="block hover:text-gray-400">Manage Parts</Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
