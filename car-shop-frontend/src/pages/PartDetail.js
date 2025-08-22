import React from 'react';
import { useCart } from '../context/CartContext';
import { useParams } from 'react-router-dom';

const dummyParts = [
  {
    name: "Brake Pads",
    description: "High-performance ceramic brake pads.",
    price: 75,
    image: "https://images.unsplash.com/photo-1595481422667-fd43f56b37c2",
  },
  {
    name: "Air Filter",
    description: "Premium air filter for improved engine airflow.",
    price: 35,
    image: "https://images.unsplash.com/photo-1580273916550-e6c551362a5c",
  },
];


const PartDetail = () => {
     const { addToCart } = useCart();
  const { id } = useParams();
  const part = dummyParts[id];

  if (!part) return <div className="text-white p-8">Part not found</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        <img src={part.image} alt={part.name} className="w-full md:w-1/2 h-80 object-contain rounded-xl bg-zinc-900 p-4" />
        <div>
          <h1 className="text-3xl font-bold">{part.name}</h1>
          <p className="text-gray-400 mt-2">{part.description}</p>
          <p className="text-white text-xl font-bold mt-4">${part.price}</p>
          <button className="mt-6 px-6 py-3 bg-white text-black rounded-xl hover:scale-105 transition">
            Buy Now
          </button>
          <button
  onClick={() => addToCart(part)} // or addToCart(part)
  className="mt-6 px-6 py-3 bg-white text-black rounded-xl hover:scale-105 transition"
>
  Add to Cart
</button>
        </div>
      </div>
    </div>
  );
};

export default PartDetail;
