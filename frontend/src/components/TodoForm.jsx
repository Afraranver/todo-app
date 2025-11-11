import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, editingTodo, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || '');
    }
  }, [editingTodo]);

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 200) {
      newErrors.title = 'Title cannot exceed 200 characters';
    }

    if (description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const result = await onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    if (result.success) {
      setTitle('');
      setDescription('');
      setErrors({});
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setErrors({});
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{editingTodo ? 'Edit TODO' : 'Add New TODO'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          className={errors.title ? 'error' : ''}
          maxLength={200}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
        <span className="char-count">{title.length}/200</span>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description"
          className={errors.description ? 'error' : ''}
          rows={4}
          maxLength={1000}
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
        <span className="char-count">{description.length}/1000</span>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTodo ? 'Update TODO' : 'Add TODO'}
        </button>
        {editingTodo && (
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;