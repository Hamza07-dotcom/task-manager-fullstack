const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to MongoDB Atlas!');
        
        // Create a test document
        const Test = mongoose.model('Test', { name: String });
        const test = new Test({ name: 'test connection' });
        await test.save();
        console.log('Successfully created test document!');
        
        // Clean up
        await Test.deleteMany({});
        await mongoose.connection.close();
        console.log('Connection test complete!');
    } catch (error) {
        console.error('Connection test failed:', error);
    }
};

testConnection();
