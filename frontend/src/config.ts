// Конфігурація API URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-api.vercel.app'  // ← замініть на ваш продакшн URL
  : 'http://localhost:3001';               // локальний розробка

export const API_ENDPOINTS = {
  CHANNELS: `${API_BASE_URL}/api/channels`,
  TRAJECTORIES: `${API_BASE_URL}/api/trajectories`,
  FETCH: `${API_BASE_URL}/api/fetch`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;