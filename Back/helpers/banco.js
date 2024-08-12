const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: '../.env'});

const username = process.env.DB_USER;
const password = process.env.DB_PASS;



mongoose
  .connect(
    `mongodb+srv://${username}:${password}@backend.dljun.mongodb.net/`
  )
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados ", err);
  });

module.exports = mongoose;