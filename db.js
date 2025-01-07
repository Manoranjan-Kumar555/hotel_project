const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB URL path
// const mongoURL = 'mongodb://localhost:27017/hotels'; // Replace "hotels" with your database name if needed
// const mongoURL = process.env.MONGODB_URL_LOCAL 
const mongoURL = process.env.MONGODB_URL;
// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,        // Use new URL parser for MongoDB connection
    useUnifiedTopology: true      // Use the new server discovery and monitoring engine
});

const db = mongoose.connection;

// Define the event listeners for the database connection
db.once("open", () => {
    console.log("Connection established with MongoDB server successfully. !");
});

db.on("error", (err) => {
    console.error("Error connecting to MongoDB server:", err);
});

db.on("close", () => {
    console.log("Disconnected from MongoDB server");
});

module.exports = db;
