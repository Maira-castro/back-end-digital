const express = require('express')
const controllerCategoria = require('../controllers/controllerCategoria')
const authenticate = require('../middleware/authMiddleware')
const categoriaRoutes = express.Router()

categoriaRoutes.post('/',controllerCategoria.createCategoria);
categoriaRoutes.get('/search', controllerCategoria.getCategoria);
categoriaRoutes.get('/:id', controllerCategoria.getCategoriaById);
categoriaRoutes.put('/:id', controllerCategoria.updateCategoria);
categoriaRoutes.delete('/:id', controllerCategoria.deletarCategoria);
module.exports = categoriaRoutes;