// src/pages/ManageCars.js
import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';

const initialCars = [
  { id: 1, name: 'Toyota', model: 'Camry', year: 2020, price: 12000 },
  { id: 2, name: 'Honda', model: 'Civic', year: 2019, price: 11000 },
];

const ManageCars = () => {
  const [cars, setCars] = useState(initialCars);
  const [editingCar, setEditingCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this car?");
    if (confirm) {
      setCars(cars.filter((car) => car.id !== id));
    }
  };

  const handleEditClick = (car) => {
    setEditingCar(car);
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCar({ ...editingCar, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setCars(
      cars.map((car) =>
        car.id === editingCar.id ? editingCar : car
      )
    );
    setShowModal(false);
  };

  return (
    <AdminDashboard>
      <h2 className="text-2xl font-bold mb-6">Manage Cars</h2>
      <div className="space-y-6">
        {cars.map((car) => (
          <div key={car.id} className="p-4 border border-zinc-600 rounded bg-zinc-900 flex justify-between items-center">
            <div>
              <p className="font-bold">{car.name} {car.model}</p>
              <p>Year: {car.year}</p>
              <p>Price: ${car.price}</p>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-yellow-500 text-black px-4 py-2 rounded hover:scale-105"
                onClick={() => handleEditClick(car)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:scale-105"
                onClick={() => handleDelete(car.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form onSubmit={handleUpdate} className="bg-zinc-800 p-6 rounded-lg w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold text-white">Edit Car</h3>
            <input
              type="text"
              name="name"
              value={editingCar.name}
              onChange={handleEditChange}
              placeholder="Name"
              className="w-full px-4 py-2 bg-zinc-700 text-white rounded"
            />
            <input
              type="text"
              name="model"
              value={editingCar.model}
              onChange={handleEditChange}
              placeholder="Model"
              className="w-full px-4 py-2 bg-zinc-700 text-white rounded"
            />
            <input
              type="number"
              name="year"
              value={editingCar.year}
              onChange={handleEditChange}
              placeholder="Year"
              className="w-full px-4 py-2 bg-zinc-700 text-white rounded"
            />
            <input
              type="number"
              name="price"
              value={editingCar.price}
              onChange={handleEditChange}
              placeholder="Price"
              className="w-full px-4 py-2 bg-zinc-700 text-white rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-500 text-black rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminDashboard>
  );
};

export default ManageCars;

