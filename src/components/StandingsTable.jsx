import React from 'react';

const StandingsTable = ({ division, autos }) => {
  return (
    <div className="bg-primary/20 rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-light mb-4">{division} Division</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4">Posición</th>
              <th className="py-3 px-4">Foto</th>
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Puntos</th>
              <th className="py-3 px-4">Racha</th>
            </tr>
          </thead>
          <tbody>
            {autos.map((auto, index) => (
              <tr key={auto.id} className="border-b border-white/10">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <img src={auto.foto_url} alt={auto.nombre} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="py-3 px-4">{auto.nombre}</td>
                <td className="py-3 px-4">{auto.puntos}</td>
                <td className="py-3 px-4">{auto.racha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsTable;