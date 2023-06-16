const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const dataBase = require("../config/DataBase");
const app = express();

// Route pour la connexion de l'utilisateur
exports.login = async (req, res) => {
  try {
    const pseudo = req.body.pseudo;
    const password = req.body.password;
    console.log("*******PSEUDO*******");
    console.log(pseudo);
    console.log("*******PASSWORD*******");
    console.log(password);

    // Connexion à la base de données
    const connection = dataBase;

    // Récupération du mot de passe hashé de l'utilisateur
    const query = "SELECT mot_de_passe FROM users WHERE pseudo = ?";
    const [rows] = await connection.execute(query, [pseudo]);
    console.log("********ROWS*********");
    console.log(rows);

    if (rows.length === 0) {
      // L'utilisateur n'existe pas
      res.status(401).json({ error: "Identifiants invalides" });
      return;
    }

    const hashedPassword = rows[0].mot_de_passe;
    console.log("*******HASHPASSEWORD***********");
    console.log(hashedPassword);

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("****ISMATCH******");
    console.log(isMatch);

    if (!isMatch) {
      // Mot de passe incorrect
      res.status(401).json({ error: "Identifiants invalides" });
      return;
    }
    // Authentification réussie
    res.status(200).json({ message: "Authentification réussie" });
    console.log(res.status);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'authentification de l'utilisateur" });
  }
};
