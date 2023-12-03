const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepository = require('../repository/userRepository');
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

async function Login(email, senha) {
    console.log('Iniciando LOGIN SERVICE...');
    console.log('Email recebido: ', email);
    console.log('Senha recebida ');
    
    const user = await userRepository.findUserByEmail(email);
    
    if (user && await bcrypt.compare(senha, user.senhahash)) {
        const token = jwt.sign({ userId: user.id, is_admin: user.is_admin }, jwtSecret, { expiresIn: '1h' });
        console.log('Token gerado: ', token);
        return { auth: true, token: token };
    }
    throw new Error("Usuário ou senha inválidos"); 
}

async function validarToken(token) {
    console.log('Validando TOKEN SERVICE...');
    try{
        const decoded = jwt.verify(token, jwtSecret);
        const user = await userRepository.findUserById(decoded.userId);
        if(!user) throw new Error("Acesso negado!");
        return decoded;
    } catch(error) {
        throw new Error ("Token inválido ou expirado");
    }
}

module.exports = { Login, validarToken }