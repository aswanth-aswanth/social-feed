const router = require('express').Router();
const {
  getCurrentUser,
  updateProfile,
  getUserById
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/profile', auth, getCurrentUser);
router.put('/profile', auth, upload.fields([{ name: 'profilePicture', maxCount: 1 },{ name: 'coverPicture', maxCount: 1 }]), updateProfile);
router.get('/:id', auth, getUserById);

module.exports = router; 