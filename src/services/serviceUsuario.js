
const Usuario = require("../models/tabelaUsuario");
const bcrypt = require('bcrypt');
// Função para obter um usuário pelo ID
const getUsuarioById = async (id) => {
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

// Função para atualizar um usuário
const updateUsuario = async (id, { firstname, surname, email }) => {
    const user = await Usuario.findByPk(id);  // Renomeado para 'user' para evitar conflito
  
    if (!user) {
      return null; // Retorna null se o usuário não for encontrado
    }
  
    // Atualiza os dados do usuário
    user.firstname = firstname;
    user.surname = surname;
    user.email = email;
  
    // Salva as alterações
    await user.save();
  
    return user;  // Retorna o usuário atualizado
  };

  const deleteUsuario = async (id) => {
    const user = await Usuario.findByPk(id);
  
    if (!user) {
      return null; // Retorna null se o usuário não for encontrado
    }
  
    await user.destroy();  // Deleta o usuário
    return user;  // Retorna o usuário deletado (ou poderia retornar apenas um valor booleano)
  };
module.exports = {
    CriarUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
};