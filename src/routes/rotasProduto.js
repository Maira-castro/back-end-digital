const { controllerGetProdutos,controllerGetProdutosID, controllerPostProduct, controllerPutProduct, controllerDeleteProduct }= require('../controllers/controllerProduto');
const authenticate = require('../middleware/authMiddleware')
const express = require('express');
const routerProduct = express.Router()

routerProduct.get('/search', controllerGetProdutos)
routerProduct.get('/:id', controllerGetProdutosID)
routerProduct.post('/', controllerPostProduct)
routerProduct.put('/:id',authenticate, controllerPutProduct)
routerProduct.delete('/:id' ,authenticate,controllerDeleteProduct)

module.exports = routerProduct