const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2/promise");

//url
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const mysqlconnection = mysql.createConnection(urlDB);

mysqlconnection
  .getConnection()
  .then((connection) => {
    console.log("Connecté à la base de données forum");
    console.log(`Connected as id ${connection.threadId}`);

    connection.release();
  })
  .catch((error) => {
    console.log(`Erreur de connexion à la base de données: ${error}`);
  });

module.exports = mysqlconnection;
