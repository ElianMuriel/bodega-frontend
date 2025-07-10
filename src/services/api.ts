import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3004'; // 👈 Cambia si tu backend está en otro puerto o dominio

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Si hay token guardado, lo añade automáticamente a las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Función para login
export const loginApi = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // Devuelve el token y demás info
};

// Función para registro
export const registerApi = async (email: string, password: string, username?: string) => {
    const response = await api.post("/users", {
        email,
        password,
        username,
    });
    return response.data;
};

export default api;
