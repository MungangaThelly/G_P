const express = require('express');
const router = express.Router();

const {
    createUser,
    getUser,
    inviteUser,
    getAllUsers,
    putUser,
    deleteUser,
} = require('../Controllers/userController');

// User routes
router.post("/", createUser);  // Creates a new user
router.post("/invite", inviteUser);  // Invites a user (renamed for clarity)
router.get("/", getAllUsers);  // Get all users
router.get("/:id", getUser);  // Get specific user by ID
router.put("/:id", putUser);  // Update user by ID
router.delete("/:id", deleteUser);  // Delete user by ID

module.exports = router;

