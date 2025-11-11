import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for logging (development)
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = 
      error.response?.data?.error || 
      error.response?.data?.details?.join(', ') ||
      error.message || 
      'An unexpected error occurred';
    
    return Promise.reject(new Error(errorMessage));
  }
);

// API methods
export const todoAPI = {
  // Get all todos
  getAllTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  // Get single todo
  getTodoById: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create new todo
  createTodo: async (todoData) => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },

  // Update todo
  updateTodo: async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },

  // Toggle done status
  toggleTodoDone: async (id) => {
    const response = await api.patch(`/todos/${id}/done`);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },
};

export default api;