const express = require("express");
const router = express.Router();
const { getPosts, createPosts } = require("../controllers/postController");

router.get("/", getPosts);
router.post("/post", createPosts);

module.exports = router;
