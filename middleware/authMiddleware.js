const jwt = require('jsonwebtoken');

// Middleware to extract and verify JWT token
const authenticateJWT = (req, res, next) => {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;
    const secret = process.env.JWT_SECRET;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or improperly formatted' });
    }

    // Get the token by removing 'Bearer '
    const token = authHeader.split(' ')[1];

    // Verify the token using the provided secret
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        // Attach user information to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = authenticateJWT;

