const loginService = require('../service/loginService')

function verificarAcesso(req, res, next) {
    const token = req.header('X-Auth-Token');
    try {
        loginService.validarToken(token);
        next();                
    }
    catch(err) {
        res.status(err.id).json({msg: err.message});
    }
}

module.exports = { verificarAcesso }