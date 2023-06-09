const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "https://forum-alcarian.netlify.app/post",
    credentials: true,
  })
);

app.use("/post", require("./routes/postRoute"));

app.listen(process.env.PORT, () => console.log("Le server a démarré"));
