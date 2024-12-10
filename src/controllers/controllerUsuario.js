const serviceUsuario = require('../services/serviceUsuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//funcao para criar usuario
const CriarUsuario = async(req,res) => {
    const {firstname, surname, email, password, confirmPassword}= req.body;

    //validações
    if(!firstname ||!surname || !email || !password || !confirmPassword) {
        return res.status(400).json({ message:'todos os campos sao obrigatorios.'});
    }
    if (password !== confirmPassword){
        return res.status(400).json({ message:'as senhas nao coincidem.'});
    }
    try{
        //chama para criar usuario
        const novoUsuario = await serviceUsuario.CriarUsuario({
            firstname,
            surname,
            email,
            password,
        });
        //resposta de sucesso
        return res.status(201).json({
            id: novoUsuario.id,
            firstname: novoUsuario.firstname,
            surname: novoUsuario.surname,
            email: novoUsuario.email,
        });
    }catch (error) {
        console.error(error);
        if(error.message === 'email ja cadastrado'){
            return res.status(400).json({message: error.message});
        }
        return res.status(500).json({message:'erro interno no servidor'});
    }
};

module.exports = {
    CriarUsuario,
};