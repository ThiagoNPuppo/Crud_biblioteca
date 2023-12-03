const repository = require('../repository/userRepository');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function listUser() {
    const usuarios = await repository.listUser();
    return usuarios;
}

async function addUser({ nome, telefone, email, senha, is_admin }) {
    if (!nome || !telefone || !email || !senha) {
        throw { id: 400, msg: 'Faltam informações para adicionar o usuário!' }
    } else { 
        const senhaHash = await bcrypt.hash(senha, saltRounds);
        const usuario = await repository.addUser({ nome, telefone, email, senhaHash, is_admin });
        return usuario;
    }
}    

async function removerUsuario(id) {
    const userDeletado = await repository.removerUsuario(id);
    if(userDeletado){
        return userDeletado;
    }
    else{
        throw {id: 404, msg: 'Usuário não encontrado!'}    
    }
}

async function atualizarUsuario(id, nome, telefone, email, senhaHash) {
    const userAtualizado = await repository.atualizarUsuario(id, nome, email, telefone, senhaHash);
    if(userAtualizado){
        return userAtualizado;
    }
    else{
        throw {id: 404, msg: 'Usuário não encontrado!'}    
    }
    
}

async function getUserName(nome){
    const userBuscado = await repository.getUserName(nome);
    if(userBuscado){
        return userBuscado;
    }
    else{
        throw {id: 404, msg: 'Usuário não encontrado!'}    
    }
}

async function getUserId(id){
    const userBuscado = await repository.getUserId(id);
    if(userBuscado){
        return userBuscado;
    }
    else{
        throw {id: 404, msg: 'Usuário não encontrado!'}    
    }
}

async function gerarToken(usuario) {
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        is_admin: usuario.is_admin // incluir a informação se é admin ou não
    };
    return await jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Expira em 1 hora
}


module.exports = {
    listUser,
    addUser,
    removerUsuario,
    atualizarUsuario,
    getUserId,
    gerarToken
}
