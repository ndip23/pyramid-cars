// src/pages/AboutPage.jsx

import { FaCar, FaUserCheck, FaTachometerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import aboutImage from '../images/about us.jpeg';

const AboutPage = () => {
    return (
        <div className="bg-dark-bg text-light-text">
            <div className="container mx-auto px-4 py-16 md:py-24">
                {/* --- Hero Section --- */}
                <div className="text-center mb-20">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-6xl font-black"
                    >
                        About <span className="text-primary-red">Pyramid Cars</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mt-4 text-lg max-w-3xl mx-auto text-secondary-text"
                    >
                        Your trusted partner in acquiring quality pre-owned vehicles in Cameroon. We are dedicated to providing transparency, value, and a seamless buying experience.
                    </motion.p>
                </div>

                {/* --- Our Mission Section (Rewritten) --- */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src={aboutImage} alt="A selection of quality cars" className="rounded-lg shadow-lg w-full h-auto object-cover" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold mb-4">Our Vision for You</h2>
                        <p className="text-secondary-text leading-relaxed text-lg">
                            At Pyramid Cars, our vision is to be the most trusted and reliable source for pre-owned vehicles in the region. We understand that buying a car is a major decision. That's why we are committed to simplifying the process by offering a curated selection of mechanically sound and well-maintained cars. We believe every customer deserves to drive away with confidence and peace of mind.
                        </p>
                    </motion.div>
                </div>

                {/* --- Why Choose Us Section (Updated Icons and Text) --- */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-10">Why Buy From Us?</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-dark-card p-8 rounded-lg">
                            <FaCar className="text-primary-red text-4xl mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Quality Inspected Vehicles</h3>
                            <p className="text-secondary-text">Every car in our inventory undergoes a thorough inspection to ensure it meets our high standards of quality and safety.</p>
                        </div>
                        <div className="bg-dark-card p-8 rounded-lg">
                            <FaUserCheck className="text-primary-red text-4xl mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Transparent Process</h3>
                            <p className="text-secondary-text">We believe in honesty. You'll get clear, straightforward information about each vehicle's history and condition.</p>
                        </div>
                        <div className="bg-dark-card p-8 rounded-lg">
                            <FaTachometerAlt className="text-primary-red text-4xl mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Excellent Value</h3>
                            <p className="text-secondary-text">Our goal is to provide the best possible value, offering reliable cars at competitive and fair prices.</p>
                        </div>
                    </div>
                </div>

                 {/* --- Call to Action --- */}
                 <div className="text-center">
                    <h2 className="text-3xl font-bold">Ready to Find Your Next Car?</h2>
                    <Link to="/cars">
                        <button className="mt-6 bg-primary-red text-white font-bold py-3 px-10 rounded-lg text-lg uppercase hover:scale-105 transition-transform">
                            Browse Cars for Sale
                        </button>
                    </Link>
                 </div>
            </div>
        </div>
    );
};

export default AboutPage;