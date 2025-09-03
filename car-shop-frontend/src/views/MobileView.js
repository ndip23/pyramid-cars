// src/views/MobileView.jsx

import { useState, useEffect } from 'react';
import api from '../utils/axiosConfig.js';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.js'; // We will reuse the responsive Hero
import FeaturesBanner from '../components/FeaturesBanner.js'; // We will reuse the responsive Banner
import CarCard from '../components/CarCard.js';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// This AnimatedSection component is also fully responsive
const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      // Use responsive padding for different screen sizes
      className={`container mx-auto px-4 py-12 md:py-20 ${className || ''}`}
    >
      {children}
    </motion.section>
  );
};

const MobileView = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        // Fetch 3 cars, just like the desktop view
        const { data } = await api.get('/api/cars?limit=3');
        setCars(data.cars);
      } catch (err) {
        console.error("Failed to fetch homepage data for mobile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomepageData();
  }, []);
  
  return (
    <>
      {/* --- Section 1: Hero --- */}
      {/* Our existing Hero component is already responsive and will adapt perfectly. */}
      <Hero />

      {/* --- Section 2: Features Banner --- */}
      {/* Our existing FeaturesBanner is also responsive. */}
      <FeaturesBanner />
      
      {/* --- Section 3: Featured Cars --- */}
      {/* This section is identical to the one in DesktopView. */}
      <AnimatedSection>
        <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Featured <span className="text-primary-red">Cars for Sale</span>
            </h2>
            <p className="text-secondary-text max-w-2xl mx-auto mb-12">
                Check out our hand-picked selection of quality pre-owned vehicles.
            </p>
        </div>
        
        {loading ? (
            <p className="text-center text-xl text-secondary-text">Loading Cars...</p>
        ) : (
            cars && cars.length > 0 ? (
                 // On mobile, this grid will automatically be a single column.
                 // On tablets (md) it becomes 2 columns, on large screens (lg) 3 columns.
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {cars.map(car => <CarCard key={car._id} car={car} />)}
                </div>
            ) : (
                <p className="text-center text-secondary-text">No featured cars available at the moment.</p>
            )
        )}
        <div className="text-center mt-12">
            <Link to="/cars" className="bg-black text-white font-bold py-3 px-10 rounded-lg text-lg uppercase hover:bg-gray-700 transition-colors">
                View All Cars
            </Link>
        </div>
      </AnimatedSection>
    </>
  );
};

export default MobileView;