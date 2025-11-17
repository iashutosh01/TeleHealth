// server/middleware/roleMiddleware.js

// This middleware checks if the user's role is allowed to access the route.
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is populated by the JWT auth middleware (protect)
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, no user found' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied, insufficient permission' });
    }
    next();
  };
};

module.exports = { authorizeRoles };
//check