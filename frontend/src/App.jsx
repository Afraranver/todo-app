import React, { useState } from 'react';
import './App.css';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    toggleTodoDone,
    deleteTodo,
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateOrUpdate = async (todoData) => {
    if (editingTodo) {
      const result = await updateTodo(editingTodo._id, todoData);
      if (result.success) {
        setEditingTodo(null);
        showNotification('TODO updated successfully!');
      } else {
        showNotification(result.error, 'error');
      }
      return result;
    } else {
      const result = await createTodo(todoData);
      if (result.success) {
        showNotification('TODO created successfully!');
      } else {
        showNotification(result.error, 'error');
      }
      return result;
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleToggleDone = async (id) => {
    const result = await toggleTodoDone(id);
    if (!result.success) {
      showNotification(result.error, 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteTodo(id);
    if (result.success) {
      showNotification('TODO deleted successfully!');
    } else {
      showNotification(result.error, 'error');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
              <path d="M26 6v4H6V6h20m0-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM26 16v4H6v-4h20m0-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM26 26v4H6v-4h20m0-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"/>
            </svg>
            TODO App
          </h1>
          <p>Organize your tasks efficiently</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {error && !notification && (
            <div className="error-banner">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="app-content">
            <div className="form-section">
              <TodoForm
                onSubmit={handleCreateOrUpdate}
                editingTodo={editingTodo}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            <div className="list-section">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <TodoList
                  todos={todos}
                  onToggleDone={handleToggleDone}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>Built with React, Express, and MongoDB</p>
        </div>
      </footer>
    </div>
  );
}

export default App;