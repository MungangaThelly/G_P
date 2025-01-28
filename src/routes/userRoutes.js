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

<<<<<<< HEAD
router.post("/", createUser);
// router.post("/invite", inviteUser);
router.get("/", getAllUsers); 
router.get("/:id", getUser); 
router.put("/:id", putUser);
//router.delete("/:id", deleteUser);

module.exports = router;




=======
// User routes
router.post("/", createUser);  // Creates a new user
router.post("/invite", inviteUser);  // Invites a user (renamed for clarity)
router.get("/", getAllUsers);  // Get all users
router.get("/:id", getUser);  // Get specific user by ID
router.put("/:id", putUser);  // Update user by ID
router.delete("/:id", deleteUser);  // Delete user by ID

module.exports = router;

>>>>>>> 89d2f636acf73e4dd7498e9c88326f657ccc2d69
