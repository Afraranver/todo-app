const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Todo = require('../models/Todo');

// Validation middleware
const validateTodo = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: errors.array().map(err => err.msg),
    });
  }
  next();
};

// @route   GET /api/todos
// @desc    Get all todos
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/todos/:id
// @desc    Get single todo
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/todos
// @desc    Create a new todo
// @access  Public
router.post('/', validateTodo, handleValidationErrors, async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const todo = await Todo.create({
      title,
      description: description || '',
    });

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/todos/:id
// @desc    Update todo (title/description)
// @access  Public
router.put('/:id', validateTodo, handleValidationErrors, async (req, res, next) => {
  try {
    const { title, description } = req.body;

    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
      });
    }

    todo.title = title;
    todo.description = description !== undefined ? description : todo.description;

    await todo.save();

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/todos/:id/done
// @desc    Toggle done status
// @access  Public
router.patch('/:id/done', async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
      });
    }

    todo.done = !todo.done;
    await todo.save();

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/todos/:id
// @desc    Delete todo
// @access  Public
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;