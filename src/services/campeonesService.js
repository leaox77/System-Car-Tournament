import api from './api';

export const getCampeones = async () => {
  const response = await api.get('/index.php?controller=campeon&action=getCampeones');
  return response.data;
};