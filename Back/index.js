const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const install = require("./Routes/install");
const connectDB = require('./helpers/banco'); 
const jwt = require('jsonwebtoken');
const User = require("./model/user");

const app = express();
const port = 3333;

connectDB();

app.use("/api/install", install);

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello World");
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          const isMatch = await bcrypt.compare(password, existingUser.password);
          if (isMatch) {
              const token =  jwt.sign({ username: existingUser.username }, 'secret', { expiresIn: '300' });
              console.log(token);
              res.status(200).json({succes: true, message: 'Login bem-sucedido' });
          } else {
              res.status(401).json({ succes: false, message: 'Senha incorreta' });
          }
      }else{
        res.status(404).json({ success: false, message: 'Usuário não encontrado' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ succes: false, error: 'Erro na requisição' });
  }
});


// app.get('/api/verify', async (req, res) => {
//     const token = req.header('Authorization');
//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Token não fornecido' });
//     }

//     try {
//         const decoded = jwt.verify(token, 'secret');
//         console.log(decoded);
//         res.status(200).json({ success: true, message: 'Token válido' });
//     } catch (err) {
//         console.error(err);
//         res.status(401).json({ success: false, message: 'Token inválido' });
//     }
// });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});