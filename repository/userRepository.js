const User = require('../models/users');
const usuarioInicial = new User(1, 'admin', 'admin');
let usuarios = [];
let idUser = 1;
usuarios.push(usuarioInicial);

function geraId() {
    return idUser++;
}

function listarUsuarios() {
    return usuarios;
}

function adicionarUsuario(usuario) {
    usuario.id = geraId();
    usuarios.push(usuario);
}

function removerUsuario(id) {
    id = parseInt(id);
    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
        return usuarios.splice(index, 1);
    }
}


function atualizarUsuario(id, nome, telefone) {
    id = parseInt(id);
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        usuario.nome = nome;
        usuario.telefone = telefone;
        return usuario;
    }
}

function buscarUsuario(id) {
    id = parseInt(id);
    return usuarios.find(u => u.id === id);
}

function buscarUsuarioPorUsername(username) {
    return usuarios.find(usuario => usuario.username === username);
}


module.exports = {
    listarUsuarios,
    adicionarUsuario,
    removerUsuario,
    atualizarUsuario,
    buscarUsuario,
    buscarUsuarioPorUsername
}