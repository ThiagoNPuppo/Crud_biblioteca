const repository = require('../repository/userRepository');
const bcrypt = require('bcrypt');
const saltRounds = 10;


async function listUser() {
    const usuarios = await repository.listUser();
    return usuarios;
}

async function addUser({ nome, telefone, email, senha }) {
    if (!nome || !telefone || !email || !senha) {
        throw { id: 400, msg: 'Faltam informações para adicionar o usuário!' }
    } else {
        try{
        console.log('senha', senha);
        const senhaHash = await bcrypt.hash(senha, saltRounds);
        console.log('senhaHash', senhaHash);
        const usuario = await repository.addUser({ nome, telefone, email, senhaHash });
        return usuario;
    } catch (err) {
        console.error("erro ao adicionar usuario", err);
        throw { id: 500, msg: 'Erro'}
    }
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

function atualizarUsuario(id, nome, telefone){
    const userAtualizado = repository.atualizarUsuario(id, nome, telefone);
    if(userAtualizado){
        return userAtualizado;
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

module.exports = {
    listUser,
    addUser,
    removerUsuario,
    atualizarUsuario,
    getUserId
}