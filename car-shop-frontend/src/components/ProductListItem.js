// src/components/ProductListItem.jsx
import { FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductListItem = ({ product }) => {
  return (
    <div className="bg-card-bg p-3 rounded-lg flex items-center gap-4">
      <img src={product.image} alt={product.name} className="w-24 h-24 object-contain bg-white rounded-md"/>
      <div className="flex-grow">
        <h3 className="font-bold text-dark-text">{product.name}</h3>
        <div className="flex items-center text-xs text-secondary-text my-1">
          <FaStar className="text-yellow-400 mr-1" />
          <span>{product.rating} ({product.reviews} Reviews)</span>
        </div>
        <div className="flex justify-between items-center mt-2">
            <p className="text-xl font-black">${product.price.toFixed(2)}</p>
            <button className="bg-primary-red p-2.5 rounded-md text-white">
                <FaShoppingCart />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;