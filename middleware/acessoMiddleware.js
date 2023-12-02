const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Use uma variável de ambiente para armazenar a chave secreta

function verificarAcesso(req, res, next) {
    console.log('Middleware de autenticação acionado');
    
    const token = req.header('Authorization');
    console.log('Cabeçalho Authorization:', token);
    
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


function verificaAdministrador(req, res, next) {
    // Verifique se o usuário é um administrador com base em como você identifica os administradores em seu sistema
    const usuario = req.usuario; 
    
    if (usuario && usuario.is_admin) {
        console.log('O usuário é um administrador');
        next();
    } else {
        console.log('O usuário não é um administrador');
        return res.status(403).json({ msg: 'Acesso negado. Contate o Administrador.' });
    }
}

module.exports = {verificarAcesso, verificaAdministrador}

