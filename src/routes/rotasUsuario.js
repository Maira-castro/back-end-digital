const express = require('express');
const controllerUsuario = require('../controllers/controllerUsuario');
const authenticate = require('../middleware/authMiddleware')
const routerUsuario = express.Router();

routerUsuario.post('/',authenticate,controllerUsuario.CriarUsuario);

module.exports = routerUsuario; 