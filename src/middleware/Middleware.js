function middleware(allowedRoles) {
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }
        
        // Find user by ID (assuming a real DB lookup in production)
        const user = users.find(u => u.id === req.user.id);
        
        if (!user) {
          return res.status(401).json({ message: "Unauthorized: User not found" });
        }
  
        // Check for required roles
        if (!allowedRoles.includes(user.role)) {
          return res.status(403).json({ message: "Forbidden: Insufficient privileges" });
        }
  
        // If everything is okay, proceed to the next middleware
        next();
      } catch (err) {
        console.error("Error in middleware:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
      }
    };
  }
  
  module.exports = middleware;
  
  