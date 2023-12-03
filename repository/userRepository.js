const pool = require('../db');

async function listUser() {
    //lista todos os usuarios, apenas nome e emial
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    return result.rows;
}

async function addUser(usuario) {
    
try{
    const { nome, telefone, email, senhaHash, is_admin } = usuario;
    //verifica se o usuario já existe
    const usuarioExiste = await pool.query('SELECT * FROM users WHERE email = $1', [usuario.email]);
    if(usuarioExiste.rows[0]){
        throw {id: 409, msg: 'Usuário já existe!'}
    }    
    const result = await pool.query('INSERT INTO users (nome, telefone, email, senhaHash, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
    [nome, telefone, email, senhaHash, is_admin]);
    return result.rows[0];
} catch (err) {
    console.error('Erro na função addUser:', err);
    throw err;
    }
}

async function removerUsuario(id) {
    id = parseInt(id);
    //verifica se o usuario existe
    const usuario = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if(!usuario.rows[0]){
        throw {id: 404, msg: 'Usuário não encontrado!'}
    }
    //veriica se usuario tem livro alugado
    if(usuario.rows[0].livro_alugado){
        throw {id: 400, msg: 'Usuário não pode se removido! Possui livro alugado!'}
    }
    //deleta o usuario
    const userDeletado = await pool.query('DELETE FROM users WHERE id = $1', [id])
    return userDeletado
}

async function atualizarUsuario(id, nome, telefone, email, senha) {
    id = parseInt(id);
    //verifica se o usuario existe
    const usuario = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if(!usuario.rows[0]){
        throw {id: 404, msg: 'Usuário não encontrado!'}
    }
    //atualiza o usuario
    const result = await pool.query('UPDATE users SET nome = $1, email = $2, telefone = $3, senhaHash = $4 WHERE id = $5 RETURNING *', 
    [nome, telefone, email, senha, id]);
    return result.rows[0];
}

async function getUserName(nome) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [nome]);
    return result.rows[0];
}

async function getUserId(id) {
    id = parseInt(id);
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

async function findUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log("Usuario encontrado: ", result.rows[0]);
    return result.rows[0];
}

module.exports = {
    listUser,
    addUser,
    removerUsuario,
    atualizarUsuario,
    getUserId,
    getUserName,
    findUserByEmail
}

