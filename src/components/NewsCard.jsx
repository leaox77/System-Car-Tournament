import React from 'react';

const NewsCard = ({ noticia, onHide }) => {
  return (
    <div className="bg-primary/20 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-accent">{noticia.titulo}</h3>
      <p className="text-white/80">{noticia.contenido}</p>
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-accent">Fotos</h4>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {noticia.fotos?.map((foto, index) => (
            <img
              key={index}
              src={foto.url}
              alt={`Foto ${index + 1}`}
              className="w-full h-24 object-cover rounded"
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => onHide(noticia.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
      >
        Ocultar
      </button>
    </div>
  );
};

export default NewsCard;