# Task Manager Full Stack Application

This is a complete task management application with React frontend and Node.js backend.

## Project Structure
```
task-manager-fullstack/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   └── public/        # Public assets
└── backend/           # Node.js backend application
    └── src/           # Source files
        ├── models/    # Database models
        ├── routes/    # API routes
        ├── controllers/# Route controllers
        └── middleware/# Custom middleware
```

## Getting Started

### Prerequisites
1. Node.js (v14 or higher)
2. MongoDB (local installation or Atlas account)
3. Git

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the backend directory with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/task-manager
   JWT_SECRET=your-secret-key-here
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will open in your browser at http://localhost:5173

## Features
- User authentication (Register/Login)
- Create, Read, Update, Delete Tasks
- Task status management
- Task filtering and sorting
- Responsive design with Tailwind CSS

## API Endpoints

### Auth Routes
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user

### User Routes
- GET /api/users/profile - Get user profile
- PATCH /api/users/profile - Update profile
- DELETE /api/users/profile - Delete account

### Task Routes
- GET /api/tasks - Get all tasks
- POST /api/tasks - Create new task
- GET /api/tasks/:id - Get task by ID
- PATCH /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

- to run this project first start backend file go to its directory and then click and write npm run dev
- then start frontend part 