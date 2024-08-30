const mongoose = require("mongoose");

const postagemSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        unique: true
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

const addPost = async(titulo, imagem, conteudo) => {
    console.log(titulo, imagem, conteudo);

    if(!titulo || !imagem || !conteudo){
        return {
            success: false,
            message: "Preencha todos os campos"
        }
    }else{
        try{
            await Postagem.create({titulo, imagem, conteudo});
            return {
                success: true,
                message: "Postagem criada com sucesso"
            }
        }catch(e){
            return {
                success: false,
                message: "Erro ao criar postagem"
            }
        }
    }
}



const getPosts = async() => {   
    try{
        const posts = await Postagem.find();
        return {
            success: true,
            posts
        }
    }catch(e){
        return {
            success: false,
            message: "Erro ao buscar postagens"
        }
    }
}


const searchPost = async(titulo) => {
    try{
      
        const post = await Postagem.findOne({titulo: titulo});
        if(post){
            return {
                success: true,
                post
            }
        }else{
            return {
                success: false,
                message: "Postagem não encontrada"
            }
        }
    }catch(e){
        return {
            success: false,
            message: "Erro ao buscar postagem"
        }
    }
}

module.exports = {
    Postagem,
    addPost,
    getPosts,
    searchPost
};