import axios from 'axios';

const API_URL = import.meta.env.DEV
    ? 'http://localhost:3004' // 🖥️ Localhost cuando corres npm run dev
    : import.meta.env.VITE_API_URL; // 🌐 En producción (Netlify)

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Si hay token guardado, lo añade automáticamente a las peticiones
/*api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});*/

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

export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};

export const createCategory = async (name: string, description: string) => {
    const response = await api.post('/categories', { name, description });
    return response.data;
};

export const updateCategory = async (id: string, name: string, description: string) => {
    const response = await api.put(`/categories/${id}`, { name, description });
    return response.data;
};

export const deleteCategory = async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
};

export const getProducts = () => api.get("/products").then((res) => res.data);
export const addProduct = (product: any) =>
    api.post("/products", product).then((res) => res.data);

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const createUser = async (user: { username: string; email: string; phone: string; role: string; password: string}) => {
    const response = await api.post('/users', user);
    return response.data;
};

export const updateUser = async (id: string, user: { username: string; email: string; phone: string; role: string }) => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};
export const getSuppliers = async () => {
    const response = await api.get('/suppliers');
    return response.data;
};

export const createSupplier = async (supplier: {
    name: string;
    contact_person?: string;
    phone?: string;
    email?: string;
    address?: string;
}) => {
    const response = await api.post('/suppliers', supplier);
    return response.data;
};

export const updateSupplier = async (id: string, supplier: {
    name?: string;
    contact_person?: string;
    phone?: string;
    email?: string;
    address?: string;
}) => {
    const response = await api.put(`/suppliers/${id}`, supplier);
    return response.data;
};

export const deleteSupplier = async (id: string) => {
    const response = await api.delete(`/suppliers/${id}`);
    return response.data;
};

export default api;
