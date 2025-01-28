
const express = require('express');
const authController = require('../Controllers/authController'); 
const router = express.Router();


router.post('/register', authController.register);
router.post('/login', authController.login);
// router.get('/secure', verifyToken, authController.secure);
//router.get('/admin-only', verifyAdmin, authController.adminOnly);

router.post('/test', (req, res) => {
    console.log('Test route hit!');
    res.status(200).json({ message: 'Test route working' });
});


module.exports = router;