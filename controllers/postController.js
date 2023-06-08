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

exports.createPosts = (req, res) => {
  const { messages, author } = req.body;

  const messagesPost = new MessagesModel(messages, author);

  mysqlConnection.query(
    "INSERT INTO messages SET ?",
    messagesPost,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: error });
      } else {
        console.log(results);
        res.status(200).json({ message: "Message enregistré" });
      }
    }
  );
};
