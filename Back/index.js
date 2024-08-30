const express = require("express");
const cors = require("cors");
const https = require("https");
const bcrypt = require("bcrypt");
const install = require("./Routes/install");
const connectDB = require("./helpers/banco");
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const { getPosts, addPost, searchPost } = require("./model/postagens");
const redis = require("redis");
const compression = require("compression");
const authMiddleware = require("./Middlewares/authMiddleware");
const logMiddleware = require("./Middlewares/logMiddleware");
const app = express();
const { body, validationResult } = require("express-validator");
const xss = require("xss-clean");
const dotenv = require("dotenv");
const {
  validarLogin,
  validarTitulo,
  validarPost,
} = require("./Middlewares/verifyMiddleware");
const helmet = require("helmet");
const fs = require("fs");
const winston = require("winston");
const { RateLimiterMemory, RateLimiterRes } = require("rate-limiter-flexible");
const rateLimit = require("express-rate-limit");

dotenv.config({ path: "./.env" });

const port = process.env.PORT;
const secret = process.env.JWT_SECRET;

const client = redis.createClient();

const chavePrivada = fs.readFileSync("./certificado/key.pem", "utf8");
const certificado = fs.readFileSync("./certificado/cert.pem", "utf8");
const credenciais = { key: chavePrivada, cert: certificado };

const rateLimiter = new RateLimiterMemory({
  points: 6,
  duration: 60,
});

const login = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Vai com calma",
});

client.on("error", (err) => console.log("Redis Client errooooooooo", err));

connectDB();
client.connect();

app.use("/api/install", install);
app.use(logMiddleware);
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(limiter);
app.use(xss());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.post(
  "/api/login",
  [body("username").trim().escape(), body("password").trim().escape()],
  validarLogin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    console.log(username, password);

    try {
      await rateLimiter.consume(req.ip);
      login.info(`Tentativa de login do usuário ${username}`);
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (isMatch) {
          const token = jwt.sign({ username: existingUser.username }, secret, {
            expiresIn: "1h",
          });
          console.log("Seu token:" + token);
          res.status(200).json({
            success: true,
            message: "Login bem-sucedido",
            token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Credenciais inválidas",
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: "Usuário não encontrado",
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Erro ao processar login",
      });
    }
  }
);

app.get("/api/postagens", async (req, res) => {
    try {
        const postagensCache = await client.get("postagens");
        if (postagensCache) {
            return res.status(200).json(JSON.parse(postagensCache));
        }
        const posts = await getPosts();


        await client.set("postagens", JSON.stringify(posts), { EX: 20 });

        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Erro ao buscar postagens"
        });
    }
}); 


app.get("/api/postagens/:titulo", validarTitulo, authMiddleware, async (req, res) => {
  const { titulo } = req.params;

    try {
      const postCache = await client.get(`postagem:${titulo}`);
      login.info(`Busca pela postagem ${titulo}`);
      if (postCache) {
        return res.status(200).json(JSON.parse(postCache));
      }

      const post = await searchPost(titulo);
      console.log(post);
      if (post) {
        await client.set(`postagem:${titulo}`, JSON.stringify(post), {
          EX: 20,
        });
        res.status(200).json(post);
      } else {
        res.status(404).json({
          success: false,
          message: "Postagem não encontrada",
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Erro ao buscar postagem",
      });
    }
  }
);

app.post("/api/postagens",authMiddleware, validarPost, async (req, res) => {
  const { titulo, imagem, conteudo } = req.body;
  try {
    const post = await addPost(titulo, imagem, conteudo);

    await client.del("postagens");

    const posts = await getPosts();
    await client.set("postagens", JSON.stringify(posts), { EX: 50 });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Erro ao criar postagem",
    });
  }
});

const httpsServer = https.createServer(credenciais, app);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// })

httpsServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
