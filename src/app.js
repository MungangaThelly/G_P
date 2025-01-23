const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// Use middlewares before route definitions
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);  // Fixed the missing route attachment
app.use('/api/messages', messageRoutes);

// Catch-all for unhandled routes (Optional, for error handling)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;

