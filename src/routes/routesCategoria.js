const express = require('express')
const controllerCategoria = require('../controllers/controllerCategoria')
const authenticate = require('../middleware/authMiddleware')
const categoriaRoutes = express.Router()

categoriaRoutes.post('/',authenticate,controllerCategoria.createCategoria);
categoriaRoutes.get('/search', controllerCategoria.getCategoria);
module.exports = categoriaRoutes;