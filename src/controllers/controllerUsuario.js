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

const getUsuarioById = async (req, res) => {
    const UsuarioId = req.params.id;
  
    try {
      const Usuario = await serviceUsuario.getUsuarioById(UsuarioId);
  
      if (!Usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' }); // Usuário não encontrado
      }
  
      // Retorna as informações do usuário
      return res.status(200).json({
        id: Usuario.id,
        firstname: Usuario.firstname,
        surname: Usuario.surname,
        email: Usuario.email,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };

  const updateUsuario = async (req, res) => {
    const UsuarioId = req.params.id;  // ID do usuário para atualizar
    const { firstname, surname, email } = req.body;  // Dados para atualização
  
    // Verifica se todos os dados necessários foram enviados
    if (!firstname || !surname || !email) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
  
    try {
      // Chama o serviço para atualizar o usuário
      const updatedUser = await serviceUsuario.updateUsuario(UsuarioId, {
        firstname,
        surname,
        email,
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      // Remove os campos não desejados antes de enviar a resposta
      const { password, id, createdAt, updatedAt, ...userData } = updatedUser.toJSON();
  
      // Retorna a resposta de sucesso com a mensagem
      return res.status(204).send(); //RETORNA MENSAGEM DE SUCESSO E SEM BODY
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
  
  const deleteUsuario = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const deleteUsuario = await serviceUsuario.deleteUsuario(userId);
  
      if (!deleteUsuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      return res.status(204).send();  // Status 204, sem corpo
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
  
module.exports = {
    CriarUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
};