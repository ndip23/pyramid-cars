// src/components/TirePromo.jsx
import { motion } from 'framer-motion';

const TirePromo = () => {
  return (
    <div className="bg-card-bg overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Responsive Grid: Stacks on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          
          {/* Text Content */}
          <div className="py-12 lg:py-24 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-dark-text leading-tight">
              Take Care Of Your{' '}
              <span className="text-primary-red">Tire 25% OFF</span>
            </h2>
            <p className="mt-4 text-secondary-text max-w-md mx-auto lg:mx-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.
            </p>
            <motion.button
              className="mt-8 bg-primary-red text-white font-bold py-3 px-8 rounded-lg text-lg uppercase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>

          {/* Image Content with Animation */}
          {/* We use negative margins to make the image "bleed" off the side */}
          <motion.div 
            className="relative h-64 lg:h-full"
            initial={{x: 100, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/images/tires-promo.png" // Ensure you have this image in /public/images
              alt="Stack of Tires" 
              className="absolute bottom-0 right-0 w-auto h-full max-h-[450px] object-contain"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default TirePromo;