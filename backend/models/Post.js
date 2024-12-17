const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  images: [String],
  video: String,
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema); 