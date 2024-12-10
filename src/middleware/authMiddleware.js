const jwt = require('jsonwebtoken')

function authenticate  (req, res, next){
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message:'token nao fornecido'});
    }
    try{
    const tokenG = jwt.verify(token, process.env.KEY_TOKEN);
         req.userId = tokenG.userId;
         next();
        }catch(error){
            return res.status(401).json({message:'token invalido'});
        }
};
module.exports = authenticate;