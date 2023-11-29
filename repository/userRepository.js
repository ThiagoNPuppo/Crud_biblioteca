const pool = require('../db');

async function listUser() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

async function addUser(usuario) {
    const { nome, telefone, email, senhaHash } = usuario;
    const result = await pool.query('INSERT INTO users (nome, telefone, email, senhaHash) VALUES ($1, $2, $3, $4) RETURNING *', 
    [nome, telefone, email, senhaHash]);
    return result.rows[0];
}

async function removerUsuario(id) {
    id = parseInt(id);
    userDeletado = await pool.query('DELETE FROM users WHERE id = $1', [id])
    return userDeletado
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

async function getUserId(id) {
    id = parseInt(id);
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

function buscarUsuarioPorUsername(username) {
    return usuarios.find(usuario => usuario.username === username);
}


module.exports = {
    listUser,
    addUser,
    removerUsuario,
    atualizarUsuario,
    getUserId,
    buscarUsuarioPorUsername
}