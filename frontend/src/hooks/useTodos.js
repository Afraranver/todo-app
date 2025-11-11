import { useState, useEffect, useCallback } from 'react';
import { todoAPI } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoAPI.getAllTodos();
      setTodos(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Create todo with optimistic update
  const createTodo = async (todoData) => {
    try {
      setError(null);
      const response = await todoAPI.createTodo(todoData);
      setTodos(prevTodos => [response.data, ...prevTodos]);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Update todo with optimistic update
  const updateTodo = async (id, todoData) => {
    const previousTodos = [...todos];
    
    try {
      setError(null);
      // Optimistic update
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? { ...todo, ...todoData } : todo
        )
      );

      const response = await todoAPI.updateTodo(id, todoData);
      
      // Update with server response
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? response.data : todo
        )
      );

      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      // Revert on error
      setTodos(previousTodos);
      return { success: false, error: err.message };
    }
  };

  // Toggle done status with optimistic update
  const toggleTodoDone = async (id) => {
    const previousTodos = [...todos];
    
    try {
      setError(null);
      // Optimistic update
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? { ...todo, done: !todo.done } : todo
        )
      );

      const response = await todoAPI.toggleTodoDone(id);
      
      // Update with server response
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? response.data : todo
        )
      );

      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      // Revert on error
      setTodos(previousTodos);
      return { success: false, error: err.message };
    }
  };

  // Delete todo with optimistic update
  const deleteTodo = async (id) => {
    const previousTodos = [...todos];
    
    try {
      setError(null);
      // Optimistic update
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));

      await todoAPI.deleteTodo(id);
      return { success: true };
    } catch (err) {
      setError(err.message);
      // Revert on error
      setTodos(previousTodos);
      return { success: false, error: err.message };
    }
  };

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodoDone,
    deleteTodo,
  };
};