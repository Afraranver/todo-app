// src/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import todoRoutes from './routes/todos.js';
import errorHandler from './middleware/errorHandler.js';

// Fix __dirname in ES modules FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// THEN load .env from project root
const envPath = path.resolve(__dirname, '../.env');
console.log('Loading .env from:', envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env file:', result.error);
  console.error('Make sure .env exists at:', envPath);
} else {
  console.log('✅ Loaded', Object.keys(result.parsed || {}).length, 'environment variables');
}

// Debug environment variables
console.log('=== ENV DEBUG ===');
console.log('__dirname:', __dirname);
console.log('MONGO_URI:', process.env.MONGO_URI ? '✓ Set' : '✗ Missing');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('===============');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'TODO API is running' });
});

app.use('/api/todos', todoRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Export app (optional, for testing)
export default app;