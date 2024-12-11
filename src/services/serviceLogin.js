require('dotenv').config()
const jwt = require ('jsonwebtoken')
const tabelaUsuario = require('../models/tabelaUsuario')
const bcrypt = require('bcrypt')

const login = async(req,res) => {
    try {
        const{email, password} = req.body;

        const usuario = await tabelaUsuario.findOne({where:{email:email}, attributes:['id','firstname','surname','email','password']})

        if(!usuario){
             return res.status(400).json({ message:'email invalido'});
        }

        const passwordC = await bcrypt.compare(password, usuario.dataValues.password)

        if(!passwordC){
            return res.status(400).json({ message:'senha invalida.'});
        }
        const token = jwt.sign(
            {
                id:usuario.dataValues.id,
                email:usuario.dataValues.email
            }, process.env.KEY_TOKEN,
            {expiresIn:'2h'}
        )
        return res.status(200).json({ message:'token gerado',token});
        
    }catch(error){
        return res.status(500).json({ res,message:'erro ao logar'});
    }
}
module.exports = login;