const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const username = process.env.DB_USER;
const password = process.env.DB_PASS;

console.log(username);
console.log(password);

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@backend.dljun.mongodb.net/`, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado ao banco de dados");
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados", err);
    process.exit(1);
  }
};

module.exports = connectDB;