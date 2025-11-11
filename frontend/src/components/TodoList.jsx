import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleDone, onEdit, onDelete }) => {
  const activeTodos = todos.filter(todo => !todo.done);
  const completedTodos = todos.filter(todo => todo.done);

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2"/>
          <path d="M20 32h24M32 20v24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <h3>No TODOs yet</h3>
        <p>Start by adding your first TODO item above</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-stats">
        <span className="stat">
          <strong>{activeTodos.length}</strong> Active
        </span>
        <span className="stat">
          <strong>{completedTodos.length}</strong> Completed
        </span>
        <span className="stat">
          <strong>{todos.length}</strong> Total
        </span>
      </div>

      {activeTodos.length > 0 && (
        <div className="todo-section">
          <h2 className="section-title">Active TODOs</h2>
          {activeTodos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggleDone={onToggleDone}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h2 className="section-title">Completed TODOs</h2>
          {completedTodos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggleDone={onToggleDone}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;