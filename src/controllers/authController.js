const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
