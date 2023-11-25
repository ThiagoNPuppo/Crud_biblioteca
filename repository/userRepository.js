const pool = require('../db');

async function getUsuarios() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

async function adicionarUsuario(usuario) {
    const { nome, telefone, email, senhaHash } = usuario;
    const result = await pool.query('INSERT INTO users (nome, telefone, email, senhaHash) VALUES ($1, $2, $3, $4) RETURNING *', 
    [nome, telefone, email, senhaHash]);
    return result.rows[0];
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
    getUsuarios,
    adicionarUsuario,
    removerUsuario,
    atualizarUsuario,
    buscarUsuario,
    buscarUsuarioPorUsername
}