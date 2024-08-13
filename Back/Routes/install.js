const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user"); // Certifique-se de que o caminho está correto

router.get("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin", 10);
    await User.create({ username: "admin", password: hashedPassword });
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