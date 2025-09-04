const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

console.log('Starting server...');
console.log('Environment variables:', {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT
});

// Import routes
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev')); // Logger middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use(errorHandler);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
