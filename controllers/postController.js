const MessagesModel = require("../models/postModel");
const mysqlConnection = require("../config/db");

const MessagesModel = require("../models/postModel");
const mysqlConnection = require("../config/db");

exports.getPosts = async (req, res) => {
  try {
    const querySQL = "SELECT * FROM `messages`";
    const posts = await mysqlConnection.query(querySQL);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.createPosts = async (req, res) => {};
