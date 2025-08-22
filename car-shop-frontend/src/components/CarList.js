import React from 'react';
import CarCard from './CarCard';

const dummyCars = [
  {
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    mileage: 15000,
    price: 45000,
    image: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-3-hero-social.jpg",
  },
  {
    make: "BMW",
    model: "X5",
    year: 2021,
    mileage: 24000,
    price: 58000,
    image: "https://cdn.bmwblog.com/wp-content/uploads/2021/06/2022-bmw-x5.jpg",
  },
  {
    make: "Audi",
    model: "A4",
    year: 2020,
    mileage: 32000,
    price: 39000,
    image: "https://www.topgear.com/sites/default/files/2022/05/3-Audi-A4.jpg",
  },
];
const CarList = ({ query }) => {
  const filteredCars = dummyCars.filter((car) =>
    car.model.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="px-6 py-12">
      <h2 className="text-white text-2xl font-bold mb-6">Available Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCars.map((car, index) => (
          <CarCard car={car} id={index} key={index} />
        ))}
      </div>
    </section>
  );
};


export default CarList;
