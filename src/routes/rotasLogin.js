const express = require('express')
const controllerLogin = require('../controllers/controllerLogin')
const routerUsuario = express.Router() 

routerUsuario.post('/token',(req,res) => {
    controllerLogin(req,res)
})
module.exports = routerUsuario;