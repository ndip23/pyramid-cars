// src/views/MobileView.jsx

import { useState, useEffect } from 'react';
import api from '../utils/axiosConfig.js';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard.js';
import ProductCard from '../components/ProductCard.js';
import { motion } from 'framer-motion';

// A simple Hero component specifically for the mobile view
const MobileHero = () => (
    <motion.div 
        className="bg-dark-card p-6 rounded-lg text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
    >
        <h1 className="text-3xl font-black text-light-text uppercase">
            Your Trusted Car Companion
        </h1>
        <p className="mt-2 mb-4 text-secondary-text">
            Find quality cars and genuine spare parts, right here in Cameroon.
        </p>
        <Link to="/cars">
            <button className="w-full bg-primary-red font-bold py-3 rounded-lg uppercase">
                Browse All Cars
            </button>
        </Link>
    </motion.div>
);

const MobileView = () => {
    const [cars, setCars] = useState([]);
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMobileData = async () => {
            try {
                // Fetch 2 cars and 2 parts for a concise mobile view
                const carsPromise = api.get('/api/cars?limit=2');
                const partsPromise = api.get('/api/products?limit=2');
                const [carsResponse, partsResponse] = await Promise.all([carsPromise, partsPromise]);
                
                setCars(carsResponse.data.cars);
                setParts(partsResponse.data);
            } catch (err) {
                console.error("Failed to fetch mobile homepage data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMobileData();
    }, []);

    return (
        <div className="p-4 space-y-12">
            <MobileHero />

            {/* --- Featured Cars Section --- */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Featured Cars</h2>
                {loading ? (
                    <p className="text-secondary-text">Loading cars...</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {cars.map(car => <CarCard key={car._id} car={car} />)}
                    </div>
                )}
                 <div className="text-center mt-6">
                    <Link to="/cars" className="text-primary-red font-semibold">
                        View All Cars &rarr;
                    </Link>
                </div>
            </section>

            {/* --- Featured Spare Parts Section --- */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Top Spare Parts</h2>
                 {loading ? (
                    <p className="text-secondary-text">Loading parts...</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {parts.map(part => <ProductCard key={part._id} product={part} />)}
                    </div>
                )}
                <div className="text-center mt-6">
                    <Link to="/parts" className="text-primary-red font-semibold">
                        View All Parts &rarr;
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default MobileView;