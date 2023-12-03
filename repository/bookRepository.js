const pool = require('../db');

async function listLivros() {
    const result = await pool.query('SELECT * FROM books ORDER BY id ASC');
    return result.rows;
}

async function addLivro(titulo, autor) {
    const novoLivro = await pool.query('INSERT INTO books (titulo, autor) VALUES ($1, $2) RETURNING *',
    [titulo, autor]
    ); 
    if (novoLivro.rows.length === 0) {
        throw {id: 500, msg: "Não foi possível adicionar o livro."};
    }
    return novoLivro.rows[0];
}

async function removeLivro(id) {
    const livroDeletado = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', 
    [id]);
    if (livroDeletado.rows.length === 0) {
        throw {id: 404, msg: "Livro não encontrado."};
    }
    return livroDeletado.rows[0];
}

async function atualizaLivro(id, titulo, autor){
    const result = await pool.query('UPDATE books SET titulo = $1, autor = $2 WHERE id = $3 RETURNING *',
    [titulo, autor, id]
    );
    if (result.rows.length === 0) {
        throw {id: 404, msg: "Livro não encontrado."};
    }
    return result.rows[0];
}

async function alugaLivro(bookID, userID) {
    // Verificar se o livro está disponível
    const livroDisponivel = await pool.query(
        'SELECT * FROM books WHERE id = $1 AND status = $2', 
        [bookID, "Disponível"]
    );

    if (livroDisponivel.rows.length === 0) {
        throw {id: 400, msg: "Livro não disponível para aluguel."};
    }
    //verifica se o usuario não tem livro alugado
    const usuario = await pool.query(
        'SELECT * FROM users WHERE id = $1 AND livro_alugado IS NULL', 
        [userID]
    );
    if (usuario.rows.length === 0) {
        throw {id: 400, msg: "Usuário já possui um livro alugado."};
    }
    // Atualiza o status do livro para 'Alugado'
    await pool.query('UPDATE books SET status = $1 WHERE id = $2', ["Alugado", bookID]);
    
    // Atualiza o livro alugado pelo usuário
    await pool.query('UPDATE users SET livro_alugado = $1 WHERE id = $2', [bookID, userID]);

    // Retorna as informações atualizadas do livro
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookID]);
    return result.rows[0];
}

async function devolveLivro(bookID, userID) {
    // Verificar se o livro está alugado pelo usuário
    const livroAlugado = await pool.query(
        'SELECT * FROM books WHERE id = $1', 
        [bookID]
    );
    if (livroAlugado.rows.length === 0 || livroAlugado.rows[0].status !== 'Alugado') {
        throw {id: 400, msg: "O Livro não foi encontrado ou não está alugado."};
    }
    // Atualiza o livro alugado para 'null' no usuário
    await pool.query('UPDATE users SET livro_alugado = NULL WHERE id = $1', [userID]);

    // Atualiza o status do livro para 'Disponível'
    await pool.query('UPDATE books SET status = $1 WHERE id = $2', ["Disponível", bookID]);

    // Retorna as informações atualizadas do livro
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookID]);
    return result.rows[0];
}

async function getBooktitulo(titulo) {
    const result = await pool.query('SELECT * FROM books WHERE titulo LIKE $1', [`%${titulo}%`]
    );
    if (result.rows.length === 0) {
        throw {id: 404, msg: "Livro não encontrado."};
    } else {
        return result.rows;
    }
}

async function getLivroId(id) {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]
    );
    if (result.rows.length === 0) {
        throw {id: 404, msg: "Livro não encontrado."};
    } else {
        return result.rows[0];
    }
}  

module.exports = {
    listLivros,
    addLivro,
    removeLivro,
    atualizaLivro,
    alugaLivro,
    devolveLivro,
    getLivroId
}