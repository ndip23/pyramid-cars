// src/pages/AboutPage.jsx

import { FaAward, FaUsers, FaShippingFast } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            {/* --- Hero Section --- */}
            <div className="text-center mb-20">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-5xl md:text-6xl font-black text-dark-text"
                >
                    About <span className="text-primary-red">Parts.</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-4 text-lg max-w-3xl mx-auto text-secondary-text"
                >
                    Your trusted partner for high-quality auto parts. We are dedicated to providing the best products and services to keep your vehicle running at its best.
                </motion.p>
            </div>

            {/* --- Our Mission Section --- */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    <img src="/images/about-us-image.jpg" alt="Mechanic working on a car" className="rounded-lg shadow-lg w-full h-auto" />
                </motion.div>
                <div>
                    <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
                    <p className="text-secondary-text leading-relaxed">
                        Our mission is simple: to provide car enthusiasts and everyday drivers with reliable, affordable, and high-quality auto parts. We believe that maintaining your vehicle should be accessible and straightforward. We source our parts from trusted manufacturers and stand behind every product we sell.
                    </p>
                </div>
            </div>

            {/* --- Why Choose Us Section --- */}
            <div className="text-center mb-20">
                <h2 className="text-4xl font-bold mb-10">Why Choose Us?</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature Card 1 */}
                    <div className="bg-card-bg p-6 rounded-lg">
                        <FaAward className="text-primary-red text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
                        <p className="text-secondary-text">Every part we sell undergoes rigorous quality checks to ensure it meets our high standards.</p>
                    </div>
                    {/* Feature Card 2 */}
                    <div className="bg-card-bg p-6 rounded-lg">
                        <FaUsers className="text-primary-red text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Expert Support</h3>
                        <p className="text-secondary-text">Our knowledgeable team is always here to help you find the exact part you need.</p>
                    </div>
                    {/* Feature Card 3 */}
                    <div className="bg-card-bg p-6 rounded-lg">
                        <FaShippingFast className="text-primary-red text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                        <p className="text-secondary-text">We offer fast and reliable shipping to get you back on the road as quickly as possible.</p>
                    </div>
                </div>
            </div>

             {/* --- Call to Action --- */}
             <div className="text-center">
                <h2 className="text-3xl font-bold">Ready to Find Your Parts?</h2>
                <Link to="/shop">
                    <button className="mt-6 bg-primary-red text-white font-bold py-3 px-10 rounded-lg text-lg uppercase hover:scale-105 transition-transform">
                        Browse Our Shop
                    </button>
                </Link>
             </div>
        </div>
    );
};

export default AboutPage;