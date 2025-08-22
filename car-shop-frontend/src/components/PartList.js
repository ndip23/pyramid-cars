import React from 'react';
import PartCard from './PartCard';

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

const PartList = ({ query }) => {
  const filteredParts = dummyParts.filter((part) =>
    part.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="px-6 py-12">
      <h2 className="text-white text-2xl font-bold mb-6">Car Parts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredParts.map((part, index) => (
          <PartCard part={part} id={index} key={index} />
        ))}
      </div>
    </section>
  );
};


export default PartList;

