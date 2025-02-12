// userHandler.js

// Simulating an in-memory database with an array
let users = [];  // This will store our users

// Function to read a user by username
const readByUserName = (username) => {
  return users.find(user => user.username === username);  // Find the user by username
};

const create = (userData) => {
  try {
    const newUser = { id: users.length + 1, ...userData };  // Assign an ID and spread user data
    users.push(newUser);  // Add the new user to the array
    return newUser;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find(user => user.id === id);
};

const updateUser = (id, updatedData) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;  // Return null if user is not found
  users[userIndex] = { ...users[userIndex], ...updatedData };  // Update user data
  return users[userIndex];
};

const deleteUser = (id) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  const deletedUser = users.splice(userIndex, 1);  // Remove the user from the array
  return deletedUser[0];
};

module.exports = {
  create,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
