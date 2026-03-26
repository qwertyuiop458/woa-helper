// Конфігурація API URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // Використовуємо відносний URL для Vercel
  : 'http://localhost:3001';  // локальний розробка

export const API_ENDPOINTS = {
  CHANNELS: `${API_BASE_URL}/channels`,
  TRAJECTORIES: `${API_BASE_URL}/trajectories`,
  FETCH: `${API_BASE_URL}/fetch`,
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_BASE_URL;