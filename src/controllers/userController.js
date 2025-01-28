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
  }
};
