const MessagesModel = require("../models/postModel");
const mysqlpool = require("../config/DataBase");

exports.getPosts = async (req, res) => {
  try {
    const querySQL = "SELECT * FROM `messages`";
    const posts = await mysqlpool.query(querySQL, MessagesModel);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.createPosts = (req, res) => {
  const { message, author } = req.body;

  const messagesPost = new MessagesModel(message, author);

  mysqlpool.query(
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

exports.editPosts = (req, res) => {
  const { postId, message, author } = req.body;

  const updatedPost = new MessagesModel(message, author);

  mysqlpool.query(
    "UPDATE messages SET ? WHERE id = ?",
    [updatedPost, postId],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ message: "Le message n'a pas été trouvé" });
        } else {
          res.status(200).json({ message: "Message modifié avec succès" });
        }
      }
    }
  );
};

exports.deletePosts = (req, res) => {
  const { postId } = req.params;

  mysqlpool.query(
    "DELETE FROM messages WHERE id = ?",
    postId,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ message: "Le message n'a pas été trouvé" });
        } else {
          res.status(200).json({ message: "Message supprimé avec succès" });
        }
      }
    }
  );
};
