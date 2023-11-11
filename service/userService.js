const repository = require('../repository/userRepository');
const User = require('../models/users');

function listarUsuarios() {
    return repository.listarUsuarios();
}

function adicionarUsuario(usuario) {
    if(usuario && usuario.nome && usuario.telefone){
        const userAdicionado = new User(usuario.nome, usuario.telefone, usuario.senha);
        repository.adicionarUsuario(userAdicionado);
    }
    else{
        throw {id: 400, msg: 'Faltam informações para adicionar o usuário!'}
    }
}

function removerUsuario(id) {
    const userDeletado = repository.removerUsuario(id);
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

function buscarUsuario(id){
    const userBuscado = repository.buscarUsuario(id);
    if(userBuscado){
        return userBuscado;
    }
    else{
        throw {id: 404, msg: 'Usuário não encontrado!'}    
    }
}

module.exports = {
    listarUsuarios,
    adicionarUsuario,
    removerUsuario,
    atualizarUsuario,
    buscarUsuario
}