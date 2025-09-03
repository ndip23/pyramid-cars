// src/App.js

import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext.js';
import { Toaster } from 'react-hot-toast';

// Layout Components
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import AdminRoute from './components/AdminRoute.js';
import WhatsAppButton from './components/WhatsAppButton.js';

// Page Components
import HomePage from './pages/HomePage.js';
import ProductDetailPage from './pages/ProductDetailPage.js';
import CartPage from './pages/CartPage.js';
import RegisterPage from './pages/RegisterPage.js';
import LoginPage from './pages/LoginPage.js';
import DashboardPage from './pages/DashboardPage.js';
import AboutPage from './pages/AboutPage.js';
import ContactPage from './pages/ContactPage.js';
import PartsListPage from './pages/PartsListPage.js';

// --- FIX #1: Correct and Unambiguous Imports ---
// Public-facing pages for cars
import PublicCarListPage from './pages/CarListPage.js'; 
import CarDetailPage from './pages/CarDetailPage.js'; 

// Admin Page Components
import AdminDashboard from './pages/admin/AdminDashboard.js';
import AdminHome from './pages/admin/AdminHome.js';
import ProductListPage from './pages/admin/ProductListPage.js';
import ProductCreatePage from './pages/admin/ProductCreatePage.js';
import ProductEditPage from './pages/admin/ProductEditPage.js';
// Admin-facing page for managing cars
import AdminCarListPage from './pages/admin/CarListPage.js'; 


const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="bg-dark-bg min-h-screen font-sans flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
            {/* ====================================================== */}
            {/*                    PUBLIC ROUTES                       */}
            {/* ====================================================== */}
            <Route path="/" element={<HomePage />} />
            
            {/* --- FIX #2: Correct Route Paths and Components --- */}
            <Route path="/cars" element={<PublicCarListPage />} />
            <Route path="/cars/:id" element={<CarDetailPage />} />

           {/*  <Route path="/parts" element={<PartsListPage />} /> */}
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* ====================================================== */}
            {/*                USER PROTECTED ROUTES                   */}
            {/* ====================================================== */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />

            {/* ====================================================== */}
            {/*                 ADMIN PROTECTED ROUTES                 */}
            {/* ====================================================== */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
              <Route index element={<AdminHome />} />
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="products" element={<ProductListPage />} />
              <Route path="products/create" element={<ProductCreatePage />} />
              <Route path="products/:id/edit" element={<ProductEditPage />} />
              <Route path="cars" element={<AdminCarListPage />} />
            </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
    </div>
  );
};


function App() {
  return (
    <CartProvider>
       <Toaster 
          position="bottom-center" 
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#F5F5F5',
              border: '1px solid #333',
            },
          }}
        />
       <Layout />
    </CartProvider>
  )
}

export default App;