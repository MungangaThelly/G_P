<<<<<<< HEAD
const users = require('../domain/user_handler.js');
//const userHandler = require('../domain/user_handler.js')
exports.createUser = (req, res) => {
  try {
    const { email, password, name, role } = req.body;
  
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = new User(newId, email, password, name, role);
    
    users.push(newUser); 

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    });
  }
};

exports.getAllUsers = (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving users',
      error: error.message,
    });
  }
};

exports.getUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving user',
      error: error.message,
    });
  }
};

exports.putUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = users.users.find((u) => u.id === userId);
    if (user) {
      
      Object.assign(user, req.body, { updateAt: new Date()})
      res.status(200).json({
        message: 'User updated successfully',
        user: user,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user',
      error: error.message,
    });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users.splice(index, 1); 
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message,
    });
=======
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Create a user
exports.createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Input validation (simplified)
    if (!email || !password || !name || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({ email, password: hashedPassword, name, role });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Invite a user
exports.inviteUser = async (req, res) => {
  try {
    // Simulate invitation logic (could be an email or an invite code)
    res.status(200).json({ message: 'User invited successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single user by id
exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a user
exports.putUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
  }
};
