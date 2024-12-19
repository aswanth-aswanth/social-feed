const Post = require("../models/Post");

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name profilePicture")
      .skip(skip)
      .limit(limit);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("author", "name profilePicture");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .populate("author", "name profilePicture");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
};

const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const mediaFiles = req.files || [];

    const post = new Post({
      author: req.user._id,
      text,
      images: mediaFiles
        .filter((file) => file.mimetype.startsWith("image/"))
        .map((file) => file.path),
      video: mediaFiles.find((file) => file.mimetype.startsWith("video/"))
        ?.path,
    });

    await post.save();
    await post.populate("author", "name profilePicture");
    res.status(201).json(post);
  } catch (error) {
    console.log("error ", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    const { text } = req.body;
    post.text = text;
    await post.save();
    await post.populate("author", "name profilePicture");

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

module.exports = {
  getAllPosts,
  getUserPosts,
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
}; 