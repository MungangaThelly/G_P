const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const authMiddleware = require("./src/middleware/authMiddleware");

const app = express();
app.use(cors());  
app.use(express.json()); 


app.use('/api/users', userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/messages', messageRoutes)

module.exports = app; 



