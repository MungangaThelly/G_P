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

router.post("/", createUser);
// router.post("/invite", inviteUser);
router.get("/", getAllUsers); 
router.get("/:id", getUser); 
router.put("/:id", putUser);
//router.delete("/:id", deleteUser);

module.exports = router;




