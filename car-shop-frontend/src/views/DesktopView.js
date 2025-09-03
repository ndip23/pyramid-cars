// src/views/DesktopView.jsx

import { useState, useEffect } from 'react';
import api from '../utils/axiosConfig.js';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.js';
import FeaturesBanner from '../components/FeaturesBanner.js';
// ProductCard is no longer needed on the homepage
// import ProductCard from '../components/ProductCard.jsx';
import CarCard from '../components/CarCard.js';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className={`container mx-auto px-4 py-16 lg:py-24 ${className || ''}`}>
      {children}
    </motion.section>
  );
};

const DesktopView = () => {
  const [cars, setCars] = useState([]);
  // const [parts, setParts] = useState([]); // <-- Commented out
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        // Now we only fetch cars for the homepage
        const carsResponse = await api.get('/api/cars?limit=3');
        setCars(carsResponse.data.cars);

        // --- The parts fetch is now commented out ---
        // const partsPromise = api.get('/api/products?limit=4');
        // const [carsResponse, partsResponse] = await Promise.all([carsPromise, partsPromise]);
        // setParts(partsResponse.data);

      } catch (err) {
        console.error("Failed to fetch homepage data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomepageData();
  }, []);
  
  return (
    <>
      <Hero />
      <FeaturesBanner />
      
      {/* --- FEATURED CARS SECTION --- */}
      <AnimatedSection>
        <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Featured <span className="text-primary-red">Cars for Sale</span>
            </h2>
            <p className="text-secondary-text max-w-2xl mx-auto mb-12">
                Check out our hand-picked selection of quality pre-owned vehicles.
            </p>
        </div>
        
        {loading ? <p className="text-center">Loading Cars...</p> : (
            cars && cars.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                     {cars.map(car => <CarCard key={car._id} car={car} />)}
                </div>
            ) : <p className="text-center text-secondary-text">No featured cars available at the moment.</p>
        )}
        <div className="text-center mt-12">
            <Link to="/cars" className="bg-black text-white font-bold py-3 px-10 rounded-lg text-lg uppercase hover:bg-gray-700 transition-colors">
                View All Cars
            </Link>
        </div>
      </AnimatedSection>
      
      {/* 
        ======================================================
        --- FEATURED SPARE PARTS SECTION (COMMENTED OUT) ---
        ======================================================
      
      <AnimatedSection>
        <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Genuine Spare <span className="text-primary-red">Parts</span>
            </h2>
            <p className="text-secondary-text max-w-2xl mx-auto mb-12">
                Need a specific part? We've got you covered. Find high-quality spare parts for all major brands.
            </p>
        </div>
        
        {loading ? <p className="text-center">Loading Parts...</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {parts.map((part) => (
              <ProductCard key={part._id} product={part} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
            <Link to="/parts" className="bg-dark-card text-white font-bold py-3 px-10 rounded-lg text-lg uppercase hover:bg-gray-700 transition-colors">
                View All Parts
            </Link>
        </div>
      </AnimatedSection>

      */}
    </>
  );
};

export default DesktopView;