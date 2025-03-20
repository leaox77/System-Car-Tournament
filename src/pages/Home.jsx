import React, { useEffect, useState } from 'react';
import { getNoticias, addNoticia, hideNoticia } from '../services/noticiasService';
import NewsCard from '../components/NewsCard';

const Home = () => {
  const [noticias, setNoticias] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNoticia, setNewNoticia] = useState({
    titulo: '',
    contenido: '',
  });
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    const data = await getNoticias();
    setNoticias(data);
  };

  const handleAddNoticia = async () => {
    await addNoticia(newNoticia, fotos);
    fetchNoticias();
    setIsAdding(false);
    setNewNoticia({ titulo: '', contenido: '' });
    setFotos([]);
  };

  const handleFileChange = (e) => {
    setFotos([...e.target.files]);
  };

  const handleHideNoticia = async (id) => {
    await hideNoticia(id);
    fetchNoticias();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-accent mb-8">Últimas Noticias</h1>

      <button
        onClick={() => setIsAdding(!isAdding)}
        className="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded mb-8"
      >
        {isAdding ? 'Cancelar' : 'Agregar Noticia'}
      </button>

      {isAdding && (
        <div className="bg-primary/20 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-light mb-4">Agregar Noticia</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              value={newNoticia.titulo}
              onChange={(e) => setNewNoticia({ ...newNoticia, titulo: e.target.value })}
              className="w-full bg-dark text-white px-4 py-2 rounded"
            />
            <textarea
              placeholder="Contenido"
              value={newNoticia.contenido}
              onChange={(e) => setNewNoticia({ ...newNoticia, contenido: e.target.value })}
              className="w-full bg-dark text-white px-4 py-2 rounded h-32"
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="bg-dark text-white px-4 py-2 rounded"
            />
            <button
              onClick={handleAddNoticia}
              className="bg-accent text-dark px-4 py-2 rounded"
            >
              Agregar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.map((noticia) => (
          <NewsCard key={noticia.id} noticia={noticia} onHide={handleHideNoticia} />
        ))}
      </div>
    </div>
  );
};

export default Home;