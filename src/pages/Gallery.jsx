import React, { useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [filters, setFilters] = useState({
    color: '',
    brand: '',
    year: '',
    championships: ''
  });
  const [cars, setCars] = useState([]);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [newCar, setNewCar] = useState({
    name: '',
    brand: '',
    year: '',
    color: '',
    photo: ''
  });

  const handleAddCar = async () => {
    try {
      await axios.post('/api/cars/add', newCar);
      // Refresh car list
      const response = await axios.get('/api/cars');
      setCars(response.data);
      setIsAddingCar(false);
      setNewCar({ name: '', brand: '', year: '', color: '', photo: '' });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-accent">Car Gallery</h1>
        <button
          onClick={() => setIsAddingCar(!isAddingCar)}
          className="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded"
        >
          {isAddingCar ? 'Cancel' : 'Add New Car'}
        </button>
      </div>

      {isAddingCar ? (
        <div className="bg-primary/20 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-light mb-4">Add New Car</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Car Name"
              value={newCar.name}
              onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
              className="bg-dark text-white px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Brand"
              value={newCar.brand}
              onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
              className="bg-dark text-white px-4 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Year"
              value={newCar.year}
              onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
              className="bg-dark text-white px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Color"
              value={newCar.color}
              onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
              className="bg-dark text-white px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={newCar.photo}
              onChange={(e) => setNewCar({ ...newCar, photo: e.target.value })}
              className="bg-dark text-white px-4 py-2 rounded md:col-span-2"
            />
            <button
              onClick={handleAddCar}
              className="bg-accent text-dark px-4 py-2 rounded md:col-span-2"
            >
              Add Car
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-primary/20 rounded-lg p-4">
            <label className="block text-light mb-2">Color</label>
            <select
              value={filters.color}
              onChange={(e) => setFilters({ ...filters, color: e.target.value })}
              className="w-full bg-dark border border-white/20 rounded px-3 py-2"
            >
              <option value="">All Colors</option>
              {/* Add color options dynamically */}
            </select>
          </div>
          <div className="bg-primary/20 rounded-lg p-4">
            <label className="block text-light mb-2">Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
              className="w-full bg-dark border border-white/20 rounded px-3 py-2"
            >
              <option value="">All Brands</option>
              {/* Add brand options dynamically */}
            </select>
          </div>
          <div className="bg-primary/20 rounded-lg p-4">
            <label className="block text-light mb-2">Year</label>
            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="w-full bg-dark border border-white/20 rounded px-3 py-2"
            >
              <option value="">All Years</option>
              {/* Add year options dynamically */}
            </select>
          </div>
          <div className="bg-primary/20 rounded-lg p-4">
            <label className="block text-light mb-2">Championships</label>
            <select
              value={filters.championships}
              onChange={(e) => setFilters({ ...filters, championships: e.target.value })}
              className="w-full bg-dark border border-white/20 rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="1">1+ Championship</option>
              <option value="2">2+ Championships</option>
              <option value="3">3+ Championships</option>
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <div key={index} className="bg-primary/20 rounded-lg overflow-hidden">
              <img
                src={car.photo}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-accent">{car.name}</h3>
                <p className="text-light">{car.brand} - {car.year}</p>
                <p className="text-white/80">Color: {car.color}</p>
                <p className="text-white/80">Championships: {car.championships}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-primary/20 rounded-lg p-6 text-center">
            <p className="text-white/80">No cars available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;