import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
});

// Request Interceptor: Attach token automatically
apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; //
    }
    return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Handle token expiration (401 errors)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout(); // Global logout on session expiry
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export default apiClient;