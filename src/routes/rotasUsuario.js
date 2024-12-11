const express = require('express');
const controllerUsuario = require('../controllers/controllerUsuario');
const authenticate = require('../middleware/authMiddleware')
const routerUsuario = express.Router();

routerUsuario.post('/',authenticate,controllerUsuario.CriarUsuario);
routerUsuario.get('/:id',controllerUsuario.getUsuarioById);
routerUsuario.put('/:id',authenticate,controllerUsuario.updateUsuario);
routerUsuario.delete('/:id',authenticate,controllerUsuario.deleteUsuario);
module.exports = routerUsuario; 