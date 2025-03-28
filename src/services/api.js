import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/torneo-autos/backend', // Ajusta según tu configuración
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;