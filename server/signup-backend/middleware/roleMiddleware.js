const checkRole = (requiredRole) => {
  return (req, res, next) => {
    console.log('User Role:', req.user.role); // Debugging log
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

module.exports = checkRole;