const loginService = require('../service/loginService')
let token = {};

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

function gerarToken(usuario) {
    const token = usuario.nome + "-" + new Date().getTime();
    tokens[token] = usuario; 
    return token;
}


module.exports = { verificarAcesso, gerarToken};

