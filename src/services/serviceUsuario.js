
const Usuario = require ("../models/tabelaUsuario");
const bcrypt = require('bcrypt');

//usuario pelo ID

//meu codigo - Usuario pelo ID
const getUsuarioById = async(id) => {
    return await Usuario.findByPk(id);
};


//meu codigo - Criar Usuario
const CriarUsuario = async ({firstname, surname, email, password}) => {
    //verfica email se já cadastrado
    const existingUsuario = await Usuario.findOne({where:{email} });
    if(existingUsuario){
        throw new Error ('email ja cadastrado');
    }
    //criptografa a senha - menino
    const hashedPassword = await bcrypt.hash(password,10);
    
    //cria usuario no banco de dados
    const novoUsuario = await Usuario.create({
        firstname,
        surname,
        email,
        password: hashedPassword,
    });
    return novoUsuario;
};
module.exports = {
    getUsuarioById,
    CriarUsuario,
};