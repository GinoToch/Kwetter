import axios from 'axios';
import { BASE_URL } from './constants';  // Adjust the path as necessary

const Intercept = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

Intercept.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem('refresh-token');
        const response = await axios.post(`${BASE_URL}/users-api/Authentication/refreshtoken`, {
          token: refreshToken,
        });

        if (response.status === 200) {
          sessionStorage.setItem('access-token', response.data.token);
          originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
          return Intercept(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Intercept;
