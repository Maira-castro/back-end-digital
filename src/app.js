require('dotenv').config
const express = require('express');
const app = express();
const routerUsuario = require('./routes/rotasUsuario');
const rotasLogin = require('./routes/rotasLogin')
const categoriaRoutes = require('./routes/routesCategoria')
const prodtuosRoutes = require('./routes/rotasProduto')
const cors = require('cors')

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.json({
        message:'bem-vindo à API'
    });
})

app.use('/v1/categoria',categoriaRoutes)
app.use('/v1/usuario', routerUsuario);
app.use('/v1/user',rotasLogin);
app.use('/v1/produtos',prodtuosRoutes)

module.exports = app;