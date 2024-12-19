const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token, user: { id: user._id, email, name } });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

const googleCallback = (req, res) => {
  try {
    const { user } = req.user;
    const token = generateToken(user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=true`);
  }
};

module.exports = {
  register,
  login,
  googleCallback,
  generateToken,
}; 