// src/components/ProductCard.jsx

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext.js';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, user } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (user) {
      addToCart(product);
    } else {
      toast.error("Please log in to add items to your cart.");
      navigate('/login', { state: { from: location } });
    }
  };
  
  const imageUrl = product.image && product.image.startsWith('http') 
    ? product.image 
    : `${process.env.REACT_APP_API_BASE_URL}${product.image}`;

  return (
    <Link to={`/product/${product._id}`} className="block h-full">
      <motion.div
        className="bg-dark-card p-4 rounded-lg shadow-lg text-light-text flex flex-col relative overflow-hidden h-full"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {product.isNew && (
          <div className="absolute top-0 right-0 bg-primary-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
            NEW
          </div>
        )}
        <div className="relative w-full h-48 mb-4">
          <img src={imageUrl} alt={product.name} className="w-full h-full object-contain rounded-md" />
        </div>
         <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-2 flex-grow">{product.name}</h3>
          <div className="flex items-center text-secondary-text mb-4">
            <FaStar className="text-yellow-400 mr-1" />
            <span>{product.rating} ({product.reviews} Reviews)</span>
          </div>
          <div className="mt-auto flex justify-between items-center">
            <p className="text-2xl font-black">
              {product.price.toLocaleString('fr-FR')} FCFA
            </p>
            <motion.button
              onClick={handleAddToCart}
              className="bg-gray-800 p-3 rounded-md text-white hover:bg-primary-red transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Add ${product.name} to cart`}
            >
              <FaShoppingCart />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;