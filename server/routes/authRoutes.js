const express = require('express');
const passport = require('passport');
const router = express.Router();

// Step 1 - Trigger Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Step 2 - Google redirects back here
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const { token } = req.user;
    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

module.exports = router;
