const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");
const Postagem = require("../model/postagens");

router.get("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin", 10);
    await User.create({ username: "admin", password: hashedPassword });
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
    ]
    await Postagem.insertMany(posts);
    res.status(200).json({
      msg: "Banco de dados instalado com sucesso",
    });
  } catch (e) {
    res.status(500).json({
      msg: "Erro ao instalar banco de dados",
    });
  }
});

module.exports = router;