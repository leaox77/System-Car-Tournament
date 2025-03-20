import api from './api';

export const addNoticia = async (noticiaData, fotos) => {
  const formData = new FormData();
  formData.append('titulo', noticiaData.titulo);
  formData.append('contenido', noticiaData.contenido);

  if (fotos) {
    fotos.forEach((foto) => {
      formData.append('fotos[]', foto);
    });
  }

  const response = await api.post('/index.php?controller=noticia&action=addNoticia', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};