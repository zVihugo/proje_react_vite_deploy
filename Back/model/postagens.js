const mongoose = require("mongoose");

const postagemSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    }
})

const Postagem = module.exports = mongoose.model("Postagem", postagemSchema);

module.exports = Postagem;