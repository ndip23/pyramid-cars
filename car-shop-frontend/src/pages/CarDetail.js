import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const dummyCars = [
  {
    make: "Tesla",
    model: "Model S",
    year: 2022,
    mileage: 5000,
    price: 85000,
    image: "https://images.unsplash.com/photo-1605559424843-b3b14b26efbe",
  },
  {
    make: "BMW",
    model: "i8",
    year: 2021,
    mileage: 8000,
    price: 95000,
    image: "https://images.unsplash.com/photo-1617042375871-c5f8b5eb8e9e",
  },
];

const CarDetail = () => {
     const { addToCart } = useCart();
  const { id } = useParams();
  const car = dummyCars[id];

  if (!car) return <div className="text-white p-8">Car not found</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        <img src={car.image} alt={car.model} className="w-full md:w-1/2 h-80 object-cover rounded-xl" />
        <div>
          <h1 className="text-3xl font-bold">{car.make} {car.model}</h1>
          <p className="text-gray-400 mt-2">Year: {car.year}</p>
          <p className="text-gray-400">Mileage: {car.mileage} km</p>
          <p className="text-white text-xl font-bold mt-4">${car.price}</p>
          <button className="mt-6 px-6 py-3 bg-white text-black rounded-xl hover:scale-105 transition">
            Buy Now
          </button>
          <button
            onClick={() => addToCart(car)} // or addToCart(part)
            className="mt-6 px-6 py-3 bg-white text-black rounded-xl hover:scale-105 transition">
            Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
