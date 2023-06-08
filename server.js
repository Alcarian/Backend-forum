const express = require("express");
const port = 5000;

const app = express();

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log("Le server a démarré"));
