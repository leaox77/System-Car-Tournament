import api from './api';

export const getAutos = async () => {
  const response = await api.get('/index.php?controller=auto&action=getAutos');
  return response.data;
};

export const addAuto = async (auto) => {
  const response = await api.post('/index.php?controller=auto&action=addAuto', auto);
  return response.data;
};

export const updateAuto = async (id, auto) => {
  const response = await api.post('/index.php?controller=auto&action=updateAuto', { id, ...auto });
  return response.data;
};

export const deleteAuto = async (id) => {
  const response = await api.post('/index.php?controller=auto&action=deleteAuto', { id });
  return response.data;
};