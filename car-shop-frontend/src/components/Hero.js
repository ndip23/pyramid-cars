// src/components/Hero.js

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// We can keep importing the image, as it's the most reliable way.
// The bundler will give us the correct path to use in our inline style.
import heroCarImage from '../images/hero-car.png';

const Hero = () => {
  return (
    // The main hero container. We set the background image here using inline styles.
    <div 
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroCarImage})` }}
    >
      {/* Semi-transparent overlay to darken the background image for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Container to center the content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-[70vh] md:min-h-[80vh] flex items-center">
          
          {/* Text and Button Content */}
          <motion.div
            className="text-center md:text-left max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-tight">
              Your Trusted <span className="text-primary-red">Car</span> Companion
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-gray-200">
              Find quality pre-owned vehicles you can trust. We simplify the car buying process with transparent pricing and dedicated support.
            </p>

            <Link to="/cars">
              <motion.button
                  className="mt-10 bg-primary-red text-white font-bold py-4 px-12 rounded-lg text-lg uppercase shadow-lg transform hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                  See All Cars
              </motion.button>
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;