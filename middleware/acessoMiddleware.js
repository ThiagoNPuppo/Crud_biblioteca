const loginService = require('../service/loginService')
const tokens = {};

function verificarAcesso(req, res, next) {
    const token = req.header('X-Auth-Token');
    try {
        loginService.validarToken(token);
        next();                
    }
    catch(err) {
        res.status(401).json({msg: err.message});
    }
}

function gerarToken(usuario) {
    const token = usuario.nome + "-" + new Date().getTime();
    tokens[token] = usuario; 
    return token;
}


module.exports = { verificarAcesso, gerarToken};

