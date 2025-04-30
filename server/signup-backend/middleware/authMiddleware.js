const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Extract the token after "Bearer"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Invalid token format.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the decoded token payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error); // Log the error for debugging
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;