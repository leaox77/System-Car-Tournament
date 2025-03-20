import React from 'react';

const CarCard = ({ car }) => {
  return (
    <div className="bg-primary/20 rounded-lg overflow-hidden">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={car.fotos?.[0]?.url || 'https://via.placeholder.com/150'}
          alt={car.nombre}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-accent">{car.nombre}</h3>
        <p className="text-light">{car.marca} - {car.anio}</p>
        <p className="text-white/80">Color: {car.color}</p>
        <p className="text-white/80">División: {car.division_id}</p>
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-accent">Fotos</h4>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {car.fotos?.map((foto, index) => (
              <img
                key={index}
                src={foto.url}
                alt={`Foto ${index + 1}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;