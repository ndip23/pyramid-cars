// src/pages/AdminDashboard.js
import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 p-10 w-full text-white bg-zinc-800 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default AdminDashboard;
