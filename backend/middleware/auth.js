const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      throw new Error('Token has expired');
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Token has expired') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ message: 'Please authenticate' });
  }
}; 