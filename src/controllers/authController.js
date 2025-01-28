const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
<<<<<<< HEAD
const userHandler = require('../domain/user_handler');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_SECRET_TOKEN || "secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refreshSecret";

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        const hash = await hashPassword(password);

        const user = {
            email,
            name,
            password: hash,
            role
        };

        const createdUser = await userHandler.create(user); 
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await userHandler.readByUserName(name); 

        if (!user) {
            console.log('User not found:', name);
            return res.status(404).json({ message: "User not found!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const accessToken = generateAccessToken({ name: user.name, role: user.role });
        const refreshToken = generateRefreshToken({ name: user.name, role: user.role });

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: false });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });

        return res.status(200).json({ message: "Successfully logged in", accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

exports.secure = (req, res) => {
    res.send('Secure data accessed');
};

exports.adminOnly = (req, res) => {
    res.send('Admin data accessed');
};
=======
const User = require('../models/userModel'); // Assuming you have a User model

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admin role required' });
  }
  next();
};

// Register a new user
exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;

  // Validate input fields
  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if email is already in use
  const existingUser = await User.findOne({ email }); // Replace with actual DB query
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user and save to DB
  const newUser = new User({ email, password: hashedPassword, name, role });
  await newUser.save(); // Replace with actual DB save method

  res.status(201).json({ message: 'User registered successfully' });
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email }); // Replace with actual DB query
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare the password with the stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
};

// Secure route (Requires token verification)
exports.secure = [verifyToken, (req, res) => {
  return res.status(200).json({ message: 'Secure data accessed' });
}];

// Admin-only route (Requires admin role)
exports.adminOnly = [verifyToken, verifyAdmin, (req, res) => {
  return res.status(200).json({ message: 'Admin-only data accessed' });
}];
>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
