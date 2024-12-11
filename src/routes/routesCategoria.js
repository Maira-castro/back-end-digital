const express = require('express')
const controllerCategoria = require('../controllers/controllerCategoria')
const authenticate = require('../middleware/authMiddleware')
const categoriaRoutes = express.Router()

categoriaRoutes.post('/',authenticate,controllerCategoria.createCategoria);
categoriaRoutes.get('/search', controllerCategoria.getCategoria);
categoriaRoutes.get('/:id', controllerCategoria.getCategoriaById);
categoriaRoutes.put('/:id',authenticate, controllerCategoria.updateCategoria);
categoriaRoutes.delete('/:id',authenticate, controllerCategoria.deletarCategoria);
module.exports = categoriaRoutes;