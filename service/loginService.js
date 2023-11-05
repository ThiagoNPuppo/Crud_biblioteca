const jwt = require('jsonwebtoken')

const usuario = {
    id: 1,
    nome: 'Thiago',
    username: 'thi',
    senha: '1234'
}

const jwtSecret = 'senac';

function Login(login) {
    if(login && login.username && login.senha) {
        if(login.username == usuario.username && login.senha == usuario.senha){
            const token = jwt.sign(
                {usuario:usuario.id}, 
                jwtSecret,
                { expiresIn: '1h' });
            return token;            
        }        
    }
    throw {id: 401, message: "Usuário ou senha invalidos"};
}

function validarToken(token) {
    try{
        const payload = jwt.verify(token, jwtSecret);
        if(payload) {
            console.log(payload.usuario);
            return(payload);
        }
        else {
            throw {id: 401, message: "Acesso negado!"};
        }
    } catch(error) {
        throw {id: 401, message: "Acesso negado!"};
    }
}

module.exports = { Login, validarToken }