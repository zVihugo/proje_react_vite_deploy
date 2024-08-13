const express = require('express');
const cors = require('cors');
const install = require("./Routes/install");

//mongoose
const mongoose = require("mongoose");
const User = require("./model/user");

const app = express();
const port = 3333;

app.use("/install", install);


app.get("/api", (req, res) => {
    res.send("Hello World");
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const newUser = new User({ username, password });
      await newUser.save();
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  });

app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

require("././helpers/banco");