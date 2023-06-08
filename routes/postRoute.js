const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPosts,
  editPosts,
  deletePosts,
} = require("../controllers/postController");

router.get("/", getPosts);
router.post("/post", createPosts);
router.put("/:id", editPosts);
router.delete("/:id", deletePosts);

module.exports = router;
