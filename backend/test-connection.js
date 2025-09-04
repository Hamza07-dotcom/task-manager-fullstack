const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB connection...');
console.log('URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s
})
.then(() => {
    console.log('Successfully connected to MongoDB.');
    process.exit(0);
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
