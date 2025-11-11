# TODO Application

A full-stack TODO application built with React, Express, and MongoDB.

## 🚀 Features

- ✅ Create, Read, Update, Delete TODOs
- ✅ Mark TODOs as complete/incomplete
- ✅ Real-time updates with optimistic UI
- ✅ Form validation
- ✅ Responsive design
- ✅ Clean and intuitive interface
- ✅ Error handling
- ✅ Loading states

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Axios for API calls
- Custom hooks for state management
- CSS3 with animations

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Validator

## 📦 Project Structure
```
todo-app/
├── backend/          # Express API server
└── frontend/         # React application
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone 
cd todo-app
```

2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

3. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

The application will be available at `http://localhost:3000`

## 📖 API Documentation

See `backend/README.md` for detailed API documentation.

## 🎯 Development Decisions

### Architecture
- **Separation of Concerns**: Backend and frontend are completely decoupled
- **Custom Hooks**: Used React hooks for cleaner state management
- **Optimistic UI**: Immediate feedback with rollback on errors
- **Form Validation**: Both client and server-side validation

### Why These Technologies?
- **React**: Component-based architecture, excellent developer experience
- **Express**: Lightweight, flexible, and easy to configure
- **MongoDB**: Schema flexibility for rapid development
- **Mongoose**: ODM for better data modeling and validation

## 🧪 Testing
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📝 Assumptions & Limitations

- Single user application (no authentication)
- All TODOs are public
- No pagination (suitable for small datasets)
- No due dates or priorities
- No categories or tags

## 🔮 Future Enhancements

- User authentication
- TODO categories/tags
- Due dates and reminders
- Priority levels
- Search and filter
- Dark mode
- Mobile app


# TODO Backend API

Express.js REST API for the TODO application.

## 🚀 Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation
```bash
npm install
cp .env.example .env
```

### Environment Variables
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
NODE_ENV=development
```

### MongoDB Connection

**Local MongoDB:**
```bash
brew services start mongodb-community
```

**MongoDB Atlas:**
1. Create account at https://mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in .env

### Run
```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Endpoints

Base URL: `http://localhost:5000/api`

### Get All TODOs
```http
GET /todos
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "123",
      "title": "Complete assignment",
      "description": "Finish TODO app",
      "done": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Create TODO
```http
POST /todos
Content-Type: application/json

{
  "title": "New TODO",
  "description": "Optional description"
}
```

### Update TODO
```http
PUT /todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description"
}
```

### Toggle Done Status
```http
PATCH /todos/:id/done
```

### Delete TODO
```http
DELETE /todos/:id
```

## 🗃️ Database Schema
```javascript
{
  title: String (required, max 200 chars),
  description: String (optional, max 1000 chars),
  done: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## ⚠️ Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error message",
  "details": ["Validation error 1", "Validation error 2"]
}
```

## 🧪 Testing
```bash
npm test
```

## 📝 Assumptions

- No authentication required
- Single tenant application
- All operations are public
- No rate limiting

## 🔒 Security Considerations

For production:
- Add authentication/authorization
- Implement rate limiting
- Add request validation
- Enable CORS whitelisting
- Add helmet.js for security headers

# TODO Frontend

React application for managing TODOs.

## 🚀 Setup

### Prerequisites
- Node.js (v14+)
- Backend API running

### Installation
```bash
npm install
cp .env.example .env
```

### Environment Variables
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Run
```bash
# Development
npm start

# Build for production
npm run build
```

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── TodoList.jsx      # List container
│   ├── TodoItem.jsx      # Individual todo
│   ├── TodoForm.jsx      # Create/edit form
│   └── LoadingSpinner.jsx
├── hooks/
│   └── useTodos.js       # State management
├── services/
│   └── api.js            # API calls
├── App.jsx
└── App.css
```

### Key Features

**useTodos Hook:**
- Centralized state management
- Optimistic updates
- Error handling
- Automatic rollback on failures

**TodoForm Component:**
- Client-side validation
- Character counting
- Edit mode support
- Error display

**TodoItem Component:**
- Checkbox for done status
- Edit/delete actions
- Responsive design
- Animations

## 🎨 Styling

- Pure CSS3 (no frameworks)
- CSS Variables for theming
- Responsive design
- Smooth animations
- Accessible (ARIA labels)

## 🧪 Testing
```bash
npm test
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Assumptions

- Backend is always available
- Modern browser with ES6 support
- JavaScript enabled
- No offline support

## 🔮 Future Enhancements

- Add tests (Jest, React Testing Library)
- Implement filtering/sorting
- Add search functionality
- Dark mode toggle
- Drag-and-drop reordering

## 📄 License

MIT