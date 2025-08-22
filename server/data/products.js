// server/data/products.js

// This array contains all the products you want to add to your database initially.
const products = [
    {
      id_legacy: 1,
      name: 'Heater Control Valve',
      price: 420.00,
      image: '/images/heater-valve.png',
      rating: 4.5,
      reviews: 450,
      category: 'Engine',
      isNew: true,
    },
    {
      id_legacy: 2,
      name: 'Brake Discs',
      price: 185.50,
      image: '/images/brake-disc.png',
      rating: 4.8,
      reviews: 610,
      category: 'Brakes',
    },
    {
      id_legacy: 3,
      name: 'Tire Parts - All Season',
      price: 420.00,
      image: '/images/tire-parts.png',
      rating: 4.6,
      reviews: 530,
      category: 'Tires',
    },
    {
      id_legacy: 4,
      name: 'Body Parts - Fender',
      price: 350.00,
      image: '/images/body-parts.png',
      rating: 4.3,
      reviews: 210,
      category: 'Body',
    },
    {
      id_legacy: 5,
      name: 'Interior Parts - Speaker Set',
      price: 275.00,
      image: '/images/interior-parts.png',
      rating: 4.9,
      reviews: 780,
      category: 'Interior',
    },
    {
      id_legacy: 6,
      name: 'LED Headlights & Lighting Kit',
      price: 420.00,
      image: '/images/headlights.png',
      rating: 4.7,
      reviews: 595,
      category: 'Lighting',
    },
];

module.exports = products;