const express = require('express');
const controllerUsuario = require('../controllers/controllerUsuario');
const authenticate = require('../middleware/authMiddleware')
const routerUsuario = express.Router();

routerUsuario.post('/',controllerUsuario.CriarUsuario);
routerUsuario.get('/:id',controllerUsuario.getUsuarioById);
routerUsuario.put('/:id',controllerUsuario.updateUsuario);
routerUsuario.delete('/:id',controllerUsuario.deleteUsuario);
module.exports = routerUsuario; 