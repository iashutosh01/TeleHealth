const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/private', protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, this is a protected route!` });
});

module.exports = router;
