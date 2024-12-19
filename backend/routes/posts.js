const router = require("express").Router();
const {
  getAllPosts,
  getUserPosts,
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/upload");

router.get("/", auth, getAllPosts);
router.get("/user/:userId", auth, getUserPosts);
router.get("/my-posts", auth, getMyPosts);
router.post("/", auth, upload.array("media", 8), createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
