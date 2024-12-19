const router = require('express').Router();
const passport = require('passport');
const {
  register,
  login,
  googleCallback,
  resetPassword,
  forgotPassword
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);
router.post('/reset-password/:token', resetPassword);
router.post('/forgot-password', forgotPassword);

module.exports = router; 