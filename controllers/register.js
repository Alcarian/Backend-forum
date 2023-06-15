const express = require("express");
const bcrypt = require("bcrypt");
// const mysql = require("mysql2/promise");
const dataBase = require("../config/DataBase");
const app = express();

exports.register = async (req, res) => {
  try {
    const pseudo = req.body.pseudo;
    const password = req.body.password;

    // Génération du sel pour le hachage du mot de passe
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, salt);

    // Connexion à la base de données
    const connection = dataBase;

    // Enregistrement de l'utilisateur dans la base de données
    const query = "INSERT INTO users (pseudo, mot_de_passe) VALUES (?, ?)";
    await connection.execute(query, [pseudo, hashedPassword]);

    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement de l'utilisateur" });
  }
};
