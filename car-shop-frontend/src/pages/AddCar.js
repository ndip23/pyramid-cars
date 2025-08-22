// src/pages/AddCar.js
import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';

const AddCar = () => {
  const [car, setCar] = useState({ name: '', model: '', year: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Car Submitted:", car);
    // send to backend later
    setCar({ name: '', model: '', year: '', price: '' });
  };

  return (
    <AdminDashboard>
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="Name"
          value={car.name}
          onChange={(e) => setCar({ ...car, name: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-700 rounded"
        />
        <input
          type="text"
          placeholder="Model"
          value={car.model}
          onChange={(e) => setCar({ ...car, model: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-700 rounded"
        />
        <input
          type="number"
          placeholder="Year"
          value={car.year}
          onChange={(e) => setCar({ ...car, year: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-700 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={car.price}
          onChange={(e) => setCar({ ...car, price: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-700 rounded"
        />
        <button type="submit" className="px-6 py-2 bg-white text-black rounded hover:scale-105 transition">
          Submit
        </button>
      </form>
    </AdminDashboard>
  );
};

export default AddCar;
