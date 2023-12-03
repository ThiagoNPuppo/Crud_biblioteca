const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 

function verificarAcesso(req, res, next) {
    const token = req.header('Authorization');
        
    if (!token) {
        console.log('Nenhum token fornecido');
        return res.status(401).json({ msg: 'Acesso negado. Nenhum token fornecido.' });
    }

    try {
        console.log('Chave secreta no ponto de verificação:', JWT_SECRET);
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Token decodificado:', decoded);
        req.usuario = decoded; // Adiciona as informações do usuário decodificadas à requisição
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token inválido.' });
        console.log('Erro ao verificar o token:', err.message);
    }
}


function verificaAdm(req, res, next) {
    // Verifique se o usuário é um administrador
    const usuarioAdm = req.usuario;
    console.log('Verificando se o usuário é administrador:', usuarioAdm);
    
    if (!usuarioAdm || !usuarioAdm.is_admin) {
        console.log('O usuário não é um administrador');
        return res.status(403).json({ msg: 'Acesso negado. Contate o Administrador.' });
    } else {
        console.log('O usuário é um administrador');
        next();
    }
}

module.exports = {verificarAcesso, verificaAdm}

