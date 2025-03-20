import React, { useEffect, useState } from 'react';
import { getAutos, addAuto } from '../services/autosService';
import CarCard from '../components/CarCard';

const Gallery = () => {
  const [autos, setAutos] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAuto, setNewAuto] = useState({
    nombre: '',
    marca: '',
    anio: '',
    color: '',
    division_id: 1,
  });
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    fetchAutos();
  }, []);

  const fetchAutos = async () => {
    const data = await getAutos();
    setAutos(data);
  };

  const handleAddAuto = async () => {
    await addAuto(newAuto, fotos);
    fetchAutos();
    setIsAdding(false);
    setNewAuto({ nombre: '', marca: '', anio: '', color: '', division_id: 1 });
    setFotos([]);
  };

  const handleFileChange = (e) => {
    setFotos([...e.target.files]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-accent mb-8">Galería de Autos</h1>

      <button
        onClick={() => setIsAdding(!isAdding)}
        className="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded mb-8"
      >
        {isAdding ? 'Cancelar' : 'Agregar Auto'}
      </button>

      {isAdding && (
        <div className="bg-primary/20 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-light mb-4">Agregar Auto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre"
              value={newAuto.nombre}
              onChange={(e) => setNewAuto({ ...newAuto, nombre: e.target.value })}
              className="bg-dark text-white px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Marca"
              value={newAuto.marca}
              onChange={(e) => setNewAuto({ ...newAuto, marca: e.target.value })}
              className="bg-dark text-white px-4 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Año"
              value={newAuto.anio}
              onChange={(e) => setNewAuto({ ...newAuto, anio: e.target.value })}
              className="bg-dark text-white px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Color"
              value={newAuto.color}
              onChange={(e) => setNewAuto({ ...newAuto, color: e.target.value })}
              className="bg-dark text-white px-4 py-2 rounded"
            />
            <select
              value={newAuto.division_id}
              onChange={(e) => setNewAuto({ ...newAuto, division_id: e.target.value })}
              className="bg-dark text-white px-4 py-2 rounded"
            >
              <option value={1}>Primera División</option>
              <option value={2}>Segunda División</option>
              <option value={3}>Tercera División</option>
            </select>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="bg-dark text-white px-4 py-2 rounded"
            />
            <button
              onClick={handleAddAuto}
              className="bg-accent text-dark px-4 py-2 rounded"
            >
              Agregar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {autos.map((auto) => (
          <CarCard key={auto.id} car={auto} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;