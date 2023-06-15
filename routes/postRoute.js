const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPosts,
  editPosts,
  deletePosts,
} = require("../controllers/postController");
const { register } = require("../controllers/register");
const { login } = require("../controllers/login");

router.get("/", getPosts);
router.post("/", createPosts);
router.put("/:id", editPosts);
router.delete("/:id", deletePosts);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
