const Usuario = require("../models/tabelaUsuario");
const bcrypt = require('bcrypt');

// OBTER USUARIO PELO ID
const getUsuarioById = async (id) => {
  return await Usuario.findByPk(id);
};

// CRIAR USUARIO
const CriarUsuario = async ({ firstname, surname, email, password }) => {
  //verfica email se já cadastrado
  const existingUsuario = await Usuario.findOne({ where: { email } });
  if (existingUsuario) {
    throw new Error('email ja cadastrado');
  }
  //criptografa a senha 
  const hashedPassword = await bcrypt.hash(password, 10);

  //cria usuario no banco de dados
  const novoUsuario = await Usuario.create({
    firstname,
    surname,
    email,
    password: hashedPassword,
  });
  return novoUsuario;
};

// ATUALIZAR USUARIO
const updateUsuario = async (id, { firstname, surname, email }) => {
  const user = await Usuario.findByPk(id);

  if (!user) {
    return null; // Retorna null se o usuário não for encontrado
  }

  // Atualiza os dados do usuário
  user.firstname = firstname;
  user.surname = surname;
  user.email = email;

  // Salva as alterações
  await user.save();
};

//DELETAR USUARIO
const deleteUsuario = async (id) => {
  const user = await Usuario.findByPk(id);

  if (!user) {
    return null; // Retorna null se o usuário não for encontrado
  }

  await user.destroy();  // Deleta o usuário
  return user;
};

module.exports = {
  CriarUsuario,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};