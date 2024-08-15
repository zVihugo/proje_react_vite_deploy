const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");
const dotenv = require("dotenv");
const {Postagem} = require("../model/postagens");


dotenv.config();  
router.get("/", async (req, res) => {
  try {
    console.log("Iniciando a instalação do banco de dados...");

    const hashedPassword = await bcrypt.hash(process.env.HASHED_PASSWORD, 10);
    const hashedPassword2 = await bcrypt.hash(process.env.HASHED_PASSWORD2, 10);

    console.log("Senhas criptografadas");

    await User.create({ username: "admin", password: hashedPassword });
    await User.create({ username: "teste", password: hashedPassword2 });

    console.log("Usuários criados");

    const posts = [
      {
        titulo: "Goku",
        imagem: "https://dragonball-api.com/characters/goku_normal.webp",
        conteudo: "Goku é o principal protagonista da série Dragon Ball, conhecido por sua força e bondade."
      },
      {
        titulo: "Vegeta",
        imagem: "https://dragonball-api.com/characters/vegeta_normal.webp",
        conteudo: "Vegeta é um dos principais personagens de Dragon Ball, conhecido por sua rivalidade com Goku."
      },
      {
        titulo: "Piccolo",
        imagem: "https://dragonball-api.com/characters/picolo_normal.webp",
        conteudo: "Piccolo é um dos personagens mais fortes de Dragon Ball, conhecido por sua inteligência e força."
      }
    ];

    await Postagem.insertMany(posts);
    console.log("Postagens inseridas");

    res.status(200).json({
      msg: "Banco de dados instalado com sucesso",
    });
  } catch (e) {
    console.error("Erro ao instalar banco de dados:", e);
    res.status(500).json({
      msg: "Erro ao instalar banco de dados",
    });
  }
});

module.exports = router;