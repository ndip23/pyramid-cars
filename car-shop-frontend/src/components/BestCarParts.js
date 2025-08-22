// src/components/BestCarParts.jsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/axiosConfig.js';
import CarCard from './CarCard.js';

const BestCarParts = () => {
  const [allCars, setAllCars] = useState([]);
  const [carCategories, setCarCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('/api/cars');
        setAllCars(data);
        
        // Dynamically create a unique list of categories from the fetched data
        const categories = [...new Set(data.map(car => car.category))];
        setCarCategories(categories);

        // Set the first category as active by default
        if (categories.length > 0) {
          setActiveCategory(categories[0]);
        }
      } catch (error) {
        console.error("Failed to fetch car items for homepage:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Filter cars to display based on the currently active category
  const filteredCars = allCars.filter(car => car.category === activeCategory);

  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-center">
        Your Best <span className="text-primary-red">Car Parts</span>
      </h2>
      
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 my-8">
        {carCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-md font-semibold transition-colors duration-300
              ${
                activeCategory === category
                  ? 'bg-primary-red text-white'
                  : 'bg-dark-card text-secondary-text hover:bg-gray-700 hover:text-light-text'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Animated Car Grid */}
      {loading ? (
        <p className="text-center text-secondary-text">Loading car showcase...</p>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default BestCarParts;