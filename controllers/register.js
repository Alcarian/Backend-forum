const express = require("express");
const bcrypt = require("bcrypt");
const dataBase = require("../config/DataBase");

exports.register = async (req, res) => {
  try {
    const pseudo = req.body.pseudo;
    const password = req.body.password;

    // Vérification si le pseudo existe déjà
    const connection = dataBase;
    const checkQuery = "SELECT COUNT(*) as count FROM users WHERE pseudo = ?";
    const [rows] = await connection.execute(checkQuery, [pseudo]);
    const count = rows[0].count;

    if (count > 0) {
      return res.status(400).json({ error: "Le pseudo existe déjà" });
    }

    // Génération du sel pour le hachage du mot de passe
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, salt);

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
