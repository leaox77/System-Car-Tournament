import api from './api';

export const getResultados = async () => {
  const response = await api.get('/index.php?controller=resultado&action=getResultados');
  return response.data;
};

export const addResultado = async (resultado) => {
  const response = await api.post('/index.php?controller=resultado&action=addResultado', resultado);
  return response.data;
};

export const updateResultado = async (id, resultado) => {
  const response = await api.post('/index.php?controller=resultado&action=updateResultado', { id, ...resultado });
  return response.data;
};

export const deleteResultado = async (id) => {
  const response = await api.post('/index.php?controller=resultado&action=deleteResultado', { id });
  return response.data;
};

export const addFecha = async (fechaData) => {
    const response = await api.post('/index.php?controller=resultado&action=addFecha', fechaData);
    return response.data;
  };