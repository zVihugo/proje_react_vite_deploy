const express = require("express");
const router = express.Router();
const {userSchema} = require("../model/user");


router.get("/", async(req, res)=> {
    try{
        await userSchema.create({username: "admin", password: "admin"});
        res.status(200).json({
            msg: "Banco de dados instalado com sucesso"
        });
    } catch(e){
        res.status(500).json({
            msg: "Erro ao instalar banco de dados"
        });
    }
})