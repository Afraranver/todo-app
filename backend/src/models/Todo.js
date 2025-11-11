const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for better query performance
todoSchema.index({ createdAt: -1 });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;