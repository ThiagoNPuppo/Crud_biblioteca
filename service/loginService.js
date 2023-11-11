const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('./userService');
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

function Login(username, senha) {
    const user = userRepository.findUserByUsername(username); // Busca usuário pelo username usando o repositório
    if (user && bcrypt.compareSync(senha, user.password)) {
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        return { auth: true, token: token };
    }
    throw new Error("Usuário ou senha inválidos"); 
}

function validarToken(token) {
    try{
        const decoded = jwt.verify(token, jwtSecret);
        const user = userRepository.findUserById(decoded.userId);
        if(!user) throw new Error("Acesso negado!");
        return decoded;
    } catch(error) {
        throw new Error ("Token inválido ou expirado");
    }
}

module.exports = { Login, validarToken }