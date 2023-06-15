const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const app = express();

// Route pour la connexion de l'utilisateur
app.post("/login", async (req, res) => {
  try {
    const { pseudo, password } = req.body;

    // Connexion à la base de données
    const connection = await mysql.createConnection(dbConfig);

    // Récupération du mot de passe hashé de l'utilisateur
    const query = "SELECT mot_de_passe FROM users WHERE pseudo = ?";
    const [rows] = await connection.execute(query, [pseudo]);

    if (rows.length === 0) {
      // L'utilisateur n'existe pas
      res.status(401).json({ error: "Identifiants invalides" });
      return;
    }

    const hashedPassword = rows[0].password;

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      // Mot de passe incorrect
      res.status(401).json({ error: "Identifiants invalides" });
      return;
    }

    // Authentification réussie
    res.status(200).json({ message: "Authentification réussie" });

    connection.end();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'authentification de l'utilisateur" });
  }
});
