const router = require('express').Router();
const passport = require('passport');
const {
  register,
  login,
  googleCallback
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',passport.authenticate('google', { session: false }),googleCallback);

module.exports = router; 