import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 if it's NOT a login/register/forgot-password attempt
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || '';
      const isAuthEndpoint = requestUrl.includes('/auth/login') || 
                            requestUrl.includes('/auth/register') ||
                            requestUrl.includes('/auth/forgot-password') ||
                            requestUrl.includes('/auth/reset-password') ||
                            requestUrl.includes('/auth/verify-email');
      
      if (!isAuthEndpoint) {
        // User is authenticated but token is invalid - redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (resetToken, password) =>
    api.post(`/auth/reset-password/${resetToken}`, { password }),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me')
};

export const filmAPI = {
  getAllFilms: (params) => api.get('/films', { params }),
  getFilm: (id) => api.get(`/films/${id}`),
  getFeaturedFilms: () => api.get('/films/featured'),
  createFilm: (filmData) => api.post('/films', filmData),
  updateFilm: (id, filmData) => api.put(`/films/${id}`, filmData),
  deleteFilm: (id) => api.delete(`/films/${id}`)
};

export const reviewAPI = {
  getFilmReviews: (filmId) => api.get(`/reviews/${filmId}`),
  createReview: (reviewData) => api.post('/reviews', reviewData),
  updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/reviews/${id}`)
};

export default api;
