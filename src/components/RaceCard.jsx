import React from 'react';

const RaceCard = ({ resultado, onDelete }) => {
  return (
    <div className="bg-primary/20 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-accent">Fecha {resultado.fecha_id}</h3>
      <p className="text-light">Auto ID: {resultado.auto_id}</p>
      <p className="text-white/80">Posición: {resultado.posicion}</p>
      <p className="text-white/80">Puntos: {resultado.puntos}</p>
      <button
        onClick={() => onDelete(resultado.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
      >
        Eliminar
      </button>
    </div>
  );
};

export default RaceCard;