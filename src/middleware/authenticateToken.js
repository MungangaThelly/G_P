const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Make sure to set this in your environment

// Promisify jwt.verify to use with async/await
const verifyToken = promisify(jwt.verify);

// Middleware to verify JWT token
async function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from "Authorization" header
  
  if (!token) {
    console.log('No token provided in the Authorization header.');
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token and attach decoded user data to req.user
    const decoded = await verifyToken(token, secretKey);
    req.user = decoded;
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
}

module.exports = authenticateToken;
