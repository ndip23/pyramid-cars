// src/components/CarCard.jsx

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CarCard = ({ car }) => {
  // Construct the full image URL safely
  const imageUrl = car.image && car.image.startsWith('http')
    ? car.image
    : `${process.env.REACT_APP_API_BASE_URL}${car.image}`;

  return (
    // The entire card is a link to the car's detail page
    <Link to={`/cars/${car._id}`}>
      <motion.div
        className="bg-dark-card rounded-lg overflow-hidden group h-full flex flex-col"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Image Container */}
        <div className="relative w-full h-56">
            <img src={imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
        </div>
        
        {/* Content Container */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-light-text flex-grow">
            {car.year} {car.make} {car.model}
          </h3>

          <p className="text-2xl font-black text-primary-red my-2">
            {car.price.toLocaleString('fr-FR')} FCFA
          </p>

          <div className="flex justify-between text-secondary-text text-sm border-t border-gray-700 pt-3 mt-2">
            <span>{car.mileage.toLocaleString('fr-FR')} km</span>
            <span>{car.transmission}</span>
            <span>{car.fuelType}</span>
          </div>

          {/* Call to Action Button */}
          <div className="mt-4">
              <button className="w-full bg-primary-red text-white font-bold py-2 rounded-md transition-colors group-hover:bg-red-700">
                  View Details
              </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CarCard;