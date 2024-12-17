const router = require("express").Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/upload");

// Get all posts
router.get("/", auth, async (req, res) => {
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
});

// Get posts by user ID
router.get("/user/:userId", auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("author", "name profilePicture");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
});

// Add this route to get current user's posts
router.get("/my-posts", auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .populate("author", "name profilePicture");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
});

// Create post
router.post("/", auth, upload.array("media", 8), async (req, res) => {
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
});

// Update post
router.put("/:id", auth, async (req, res) => {
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
});

// Delete post
router.delete("/:id", auth, async (req, res) => {
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
});

module.exports = router;
