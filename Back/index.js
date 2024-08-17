const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const install = require("./Routes/install");
const connectDB = require('./helpers/banco'); 
const jwt = require('jsonwebtoken');
const User = require("./model/user");
const {getPosts, addPost, searchPost} = require("./model/postagens");
const redis = require('redis');
const authMiddleware = require('./Middlewares/authMiddleware');
const logMiddleware = require('./Middlewares/logMiddleware');
const app = express();
const dotenv = require("dotenv");
const port = 3333;

dotenv.config({ path: "./.env" });
const client = redis.createClient();
client.on('error', (err) => console.log('Redis Client errooooooooo', err));

connectDB();
client.connect();

app.use("/api/install", install);
app.use(logMiddleware);
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello World");
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
 
  try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          const isMatch = await bcrypt.compare(password, existingUser.password);
          if (isMatch) {
              const token =  jwt.sign({ username: existingUser.username }, "secret", { expiresIn: '1h' });
              console.log(token);
              res.status(200).json({succes: true, message: 'Login bem-sucedido', user: existingUser, token: token});
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


// app.get("/api/postagens", async(req, res)=> {
//     const posts = await getPosts();
//     console.log(posts);
//     const postagensCache = await client.get(posts);
//     if(postagensCache){
//         res.status(200).json(postagensCache);
//     }
//     await client.set("postagens", posts, {ex: 20});
//     res.status(200).json(posts);
//     // try{
//     //     const posts = await getPosts();
//     //     res.status(200).json(posts);
//     // }catch(e){
//     //     res.status(500).json({
//     //         success: false,
//     //         message: "Erro ao buscar postagens"
//     //     });
//     // }
// })

app.get("/api/postagens", async (req, res) => {
    try {
        const postagensCache = await client.get("postagens");
        if (postagensCache) {
            return res.status(200).json(JSON.parse(postagensCache));
        }
        const posts = await getPosts();
        console.log(posts);

        await client.set("postagens", JSON.stringify(posts), { EX: 20 });

        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Erro ao buscar postagens"
        });
    }
});

app.get("/api/postagens/:titulo", async(req, res)=> {
    const {titulo} = req.params;
    console.log(titulo);
    try{
        const post = await searchPost(titulo);
        console.log(post);
        res.status(200).json(post);
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Erro ao buscar postagem"
        });
    }
});

app.post("/api/postagens", authMiddleware, async(req, res)=> {
    const {titulo, imagem, conteudo} = req.body;
    try{
        const post = await addPost(titulo, imagem, conteudo);
        res.status(200).json(post);
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Erro ao criar postagem"
        });
    }
});

//Rota criada para teste, excluir depois
app.post('/api/logout', authMiddleware, (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        revokedTokens.push(token);
        res.status(200).json({ message: 'Token revogado com sucesso' });
    } else {
        res.status(400).json({ message: 'Token não fornecido' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});