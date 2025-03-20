import React from 'react';

const CarCard = ({ car, onDelete }) => {
  return (
    <div className="bg-primary/20 rounded-lg overflow-hidden">
      <img
        src={car.foto_url || 'https://via.placeholder.com/150'}
        alt={car.nombre}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-accent">{car.nombre}</h3>
        <p className="text-light">{car.marca} - {car.anio}</p>
        <p className="text-white/80">Color: {car.color}</p>
        <p className="text-white/80">División: {car.division_id}</p>
        <button
          onClick={() => onDelete(car.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CarCard;