import api from './api';

export const getNoticias = async () => {
  const response = await api.get('/index.php?controller=noticia&action=getNoticias');
  return response.data;
};

export const addNoticia = async (noticia) => {
  const response = await api.post('/index.php?controller=noticia&action=addNoticia', noticia);
  return response.data;
};

export const hideNoticia = async (id) => {
  const response = await api.post('/index.php?controller=noticia&action=hideNoticia', { id });
  return response.data;
};