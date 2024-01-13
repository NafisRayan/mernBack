//dbConnection.js

const mongoose = require('mongoose');
const connectDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://vaugheu:123password456@3d-reactapp.jee3ue9.mongodb.net/?retryWrites=true&w=majority');
        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log('Failed to connect to the database:', error);
    }
}

module.exports = connectDB;