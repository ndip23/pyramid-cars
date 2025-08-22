// src/components/Hero.jsx

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-20 lg:py-32 grid lg:grid-cols-2 items-center gap-12">
      <motion.div
        className="text-center lg:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-light-text uppercase">
          Your Trusted <span className="text-primary-red">Car</span> Companion
        </h1>
        <p className="mt-4 text-md sm:text-lg text-secondary-text max-w-lg mx-auto lg:mx-0">
          We get it, keeping your car in top shape is important. Find genuine spare parts for your vehicle, right here. We sabi your motor!
        </p>
        <Link to="/cars">
            <motion.button
                className="mt-8 bg-primary-red text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-lg uppercase"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                See All Cars
            </motion.button>
        </Link>
      </motion.div>
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <img src="/images/hero-car.png" alt="Red Sports Car" className="mx-auto w-full max-w-2xl" />
        <div className="absolute inset-0 -bottom-10 flex items-center justify-center -z-10">
          <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] border-4 border-dark-card rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;