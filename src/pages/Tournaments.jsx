import React, { useEffect, useState } from 'react';
import { getResultados, addFecha } from '../services/resultadosService';
import { getAutos } from '../services/autosService';
import RaceCard from '../components/RaceCard';

const Tournaments = () => {
  const [resultados, setResultados] = useState([]);
  const [autos, setAutos] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newFecha, setNewFecha] = useState({
    numero: '',
    division_id: 1,
    ganadores: [],
    perdedores: [],
  });

  useEffect(() => {
    fetchResultados();
    fetchAutos();
  }, []);

  const fetchResultados = async () => {
    const data = await getResultados();
    setResultados(data);
  };

  const fetchAutos = async () => {
    const data = await getAutos();
    setAutos(data);
  };

  const handleAddFecha = async () => {
    await addFecha(newFecha);
    fetchResultados();
    setIsAdding(false);
    setNewFecha({
      numero: '',
      division_id: 1,
      ganadores: [],
      perdedores: [],
    });
  };

  const handleGanadorChange = (index, field, value) => {
    const updatedGanadores = [...newFecha.ganadores];
    updatedGanadores[index][field] = value;
    setNewFecha({ ...newFecha, ganadores: updatedGanadores });
  };

  const handlePerdedorChange = (index, field, value) => {
    const updatedPerdedores = [...newFecha.perdedores];
    updatedPerdedores[index][field] = value;
    setNewFecha({ ...newFecha, perdedores: updatedPerdedores });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-accent mb-8">Fechas del Torneo</h1>

      <button
        onClick={() => setIsAdding(!isAdding)}
        className="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded mb-8"
      >
        {isAdding ? 'Cancelar' : 'Agregar Fecha'}
      </button>

      {isAdding && (
        <div className="bg-primary/20 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-light mb-4">Agregar Fecha</h2>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Número de Fecha"
              value={newFecha.numero}
              onChange={(e) => setNewFecha({ ...newFecha, numero: e.target.value })}
              className="w-full bg-dark text-white px-4 py-2 rounded"
            />
            <select
              value={newFecha.division_id}
              onChange={(e) => setNewFecha({ ...newFecha, division_id: e.target.value })}
              className="w-full bg-dark text-white px-4 py-2 rounded"
            >
              <option value={1}>Primera División</option>
              <option value={2}>Segunda División</option>
              <option value={3}>Tercera División</option>
            </select>

            <h3 className="text-xl font-semibold text-accent mt-6">Ganadores</h3>
            {[1, 2, 3].map((posicion, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <select
                  value={newFecha.ganadores[index]?.auto_id || ''}
                  onChange={(e) => handleGanadorChange(index, 'auto_id', e.target.value)}
                  className="bg-dark text-white px-4 py-2 rounded"
                >
                  <option value="">Seleccionar Auto</option>
                  {autos
                    .filter((auto) => auto.division_id === newFecha.division_id)
                    .map((auto) => (
                      <option key={auto.id} value={auto.id}>
                        {auto.nombre}
                      </option>
                    ))}
                </select>
                <input
                  type="number"
                  placeholder={`Puntos para ${posicion}° lugar`}
                  value={newFecha.ganadores[index]?.puntos || ''}
                  onChange={(e) => handleGanadorChange(index, 'puntos', e.target.value)}
                  className="bg-dark text-white px-4 py-2 rounded"
                />
              </div>
            ))}

            <h3 className="text-xl font-semibold text-accent mt-6">Perdedores</h3>
            {[1, 2, 3].map((posicion, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <select
                  value={newFecha.perdedores[index]?.auto_id || ''}
                  onChange={(e) => handlePerdedorChange(index, 'auto_id', e.target.value)}
                  className="bg-dark text-white px-4 py-2 rounded"
                >
                  <option value="">Seleccionar Auto</option>
                  {autos
                    .filter((auto) => auto.division_id === newFecha.division_id)
                    .map((auto) => (
                      <option key={auto.id} value={auto.id}>
                        {auto.nombre}
                      </option>
                    ))}
                </select>
                <input
                  type="number"
                  placeholder={`Puntos para ${posicion}° último`}
                  value={newFecha.perdedores[index]?.puntos || ''}
                  onChange={(e) => handlePerdedorChange(index, 'puntos', e.target.value)}
                  className="bg-dark text-white px-4 py-2 rounded"
                />
              </div>
            ))}

            <button
              onClick={handleAddFecha}
              className="bg-accent text-dark px-4 py-2 rounded"
            >
              Agregar Fecha
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resultados.map((resultado) => (
          <RaceCard key={resultado.id} resultado={resultado} />
        ))}
      </div>
    </div>
  );
};

export default Tournaments;