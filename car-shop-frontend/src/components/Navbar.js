// src/components/Navbar.jsx

import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext.js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, user, logout } = useCart();
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'Cars for Sale', href: '/cars' },
    { title: 'Spare Parts', href: '/parts' },
    { title: 'About Us', href: '/about' },
    { title: 'Contact', href: '/contact' }
  ];
  
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  // Define CSS classes for NavLink state for reusability
  const linkClasses = "transition-colors font-semibold";
  const activeLinkClasses = "text-primary-red";
  const inactiveLinkClasses = "text-secondary-text hover:text-light-text";

  return (
    <nav className="bg-dark-bg/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <h1 className="text-3xl font-black text-light-text">Pyramid<span className="text-primary-red">Cars</span></h1>
          </Link>

          {/* Desktop Links using NavLink */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.title} 
                to={link.href} 
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
              >
                {link.title}
              </NavLink>
            ))}
            {user && user.role === 'admin' && (
              <NavLink to="/admin/dashboard" className={({ isActive }) => `font-bold transition-colors ${isActive ? 'text-red-400' : 'text-primary-red hover:text-red-400'}`}>Admin Panel</NavLink>
            )}
          </div>

          {/* Desktop Auth & Cart Section */}
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/dashboard" className="font-semibold text-light-text hover:text-primary-red transition-colors">{user.username}</Link>
                <button onClick={handleLogout} className="bg-primary-red text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-secondary-text hover:text-light-text font-semibold">Login</Link>
                <Link to="/register" className="bg-transparent border border-primary-red text-primary-red font-bold py-2 px-6 rounded-lg hover:bg-primary-red hover:text-white transition-all">Sign Up</Link>
              </>
            )}
            <Link to="/cart" className="relative text-2xl text-secondary-text hover:text-light-text transition-colors">
              <FaShoppingCart />
              {totalItems > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-primary-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</motion.span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Trigger & Cart */}
          <div className="lg:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-2xl text-secondary-text hover:text-light-text transition-colors">
              <FaShoppingCart />
              {totalItems > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-primary-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</motion.span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-light-text text-2xl z-50" aria-label="Toggle menu">{isMenuOpen ? <FaTimes /> : <FaBars />}</button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu using NavLink */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden absolute top-full left-0 w-full bg-dark-card shadow-lg overflow-hidden">
            <div className="flex flex-col items-center space-y-6 py-8">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.title} 
                  to={link.href} 
                  onClick={() => setIsMenuOpen(false)} 
                  className={({ isActive }) => `text-xl font-semibold transition-colors ${isActive ? 'text-primary-red' : 'text-light-text hover:text-primary-red'}`}
                >
                  {link.title}
                </NavLink>
              ))}
              {user && user.role === 'admin' && (
                  <NavLink to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `text-xl font-bold transition-colors ${isActive ? 'text-red-400' : 'text-primary-red hover:text-red-400'}`}>Admin Panel</NavLink>
              )}
              <div className="border-t border-gray-700 w-3/4 my-2"></div>
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-light-text text-xl font-semibold hover:text-primary-red">{user.username}'s Dashboard</Link>
                  <button onClick={handleLogout} className="w-3/4 bg-primary-red text-white font-bold py-3 rounded-lg">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-light-text text-xl font-semibold hover:text-primary-red transition-colors">Login</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-3/4 bg-primary-red text-white text-center font-bold py-3 rounded-lg">Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;