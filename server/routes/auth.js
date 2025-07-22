const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controllers/authController');

const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Missing Google user info' });
  }

  try {
    let user = await User.findOne({ email });

    // If user doesn't exist, register them
    if (!user) {
      user = new User({ name, email, password: '', role: 'patient' }); // default role
      await user.save();
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Google login failed' });
  }
});
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


module.exports = router;
