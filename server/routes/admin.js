const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Example route: Only accessible by admin
router.get('/dashboard', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, you have admin access!` });
});

module.exports = router;
