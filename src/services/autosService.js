import api from './api';

export const getAutos = async () => {
  const response = await api.get('/index.php?controller=auto&action=getAutos');
  return response.data;
};

export const addAuto = async (autoData, fotos) => {
  const formData = new FormData();
  formData.append('nombre', autoData.nombre);
  formData.append('marca', autoData.marca);
  formData.append('anio', autoData.anio);
  formData.append('color', autoData.color);
  formData.append('division_id', autoData.division_id);
  formData.append('action', 'addAuto');

  fotos.forEach((foto) => {
    formData.append('fotos[]', foto);
  });

  const response = await api.post('/index.php?controller=auto&action=addAuto', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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