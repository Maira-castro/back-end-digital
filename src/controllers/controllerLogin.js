const serviceLogin = require ('../services/serviceLogin')

const controllerLogin = (req, res) => {
    serviceLogin(req,res)
}

module.exports = controllerLogin;