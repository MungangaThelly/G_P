async function adminMiddleware(req, res, next) {
    try {
        // Check if req.user is available, indicating user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: User not logged in' });
        }

        // Replace with a database query to find the user
        const user = await User.findById(req.user.id); // For a MongoDB-based app (mongoose)

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin privileges required' });
        }

        // Proceed to the next middleware if user is an admin
        next();
    } catch (err) {
        console.error('Error in adminMiddleware:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

module.exports = adminMiddleware;


