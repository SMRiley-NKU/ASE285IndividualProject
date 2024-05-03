const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // This loads the environment variables from the .env file
const connectionString = process.env.MONGO_URI


const connectToDatabase = async () => {
    try {
        console.log('MONGO_URI:', process.env.MONGO_URI);
        await mongoose.createConnection(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


module.exports = connectToDatabase;