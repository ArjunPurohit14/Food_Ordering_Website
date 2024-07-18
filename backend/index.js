const express = require("express");
const mongoDB = require("./db");
require('dotenv').config();

const cors = require("cors");  // Import CORS middleware
const app = express();
const port = 4000;

// Connect to MongoDB
mongoDB();

// CORS middleware
app.use(cors({
    origin: "http://localhost:3000",  // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allow these headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
    res.send('Hello world');
});

// Routes
app.use("/api", require("../backend/Routes/CreateUser"));
app.use("/api", require("../backend/Routes/DisplayData"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
