const pool = require('../db');

async function getLivros() {
    const result = await pool.query('SELECT * FROM books');
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

async function livroExiste(titulo, autor) {
    const result = await pool.query('SELECT * FROM books WHERE titulo = $1 AND autor = $2',
    [titulo, autor]
    );
    return result.rows.length > 0;
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

    // Atualiza o status do livro para 'Alugado'
    await pool.query('UPDATE books SET status = $1 WHERE id = $2', ["Alugado", bookID]);
    console.log('teste', userID)
    // Atualiza o livro alugado pelo usuário
    await pool.query('UPDATE users SET livro_alugado = $1 WHERE id = $2', [bookID, userID]);

    // Retorna as informações atualizadas do livro
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookID]);
    return result.rows[0];
}

// async function alugaLivro(bookID, userID) {
//     await pool.query('UPDATE users SET livro_alugado = $1 WHERE id = $2 AND livro_alugado IS NULL', [bookID, userID]);
//     const result = await pool.query(
//         'UPDATE books SET status = $1 WHERE id = $2 AND status = $3 RETURNING *',
//         ["Alugado", bookID, "Disponível"]
//     );
//     if (result.rows.length === 0) {
//         throw {id: 400, msg: "Livro não disponível para aluguel."};
//     }
//     return result.rows[0];
// }
// async function alugaLivro(bookID) {
//     const result = await pool.query('UPDATE books SET status = $1 WHERE id = $2 AND status = $3 RETURNING *',
//     ["Alugado", bookID, "Disponível"]
//     );
//     if (result.rows.length === 0) {
//         throw {id: 400, msg: "Livro não disponível para aluguel."};
//     }
//     return result.rows[0];
// }  
async function devolveLivro(bookID, userID) {
    // Atualiza o livro alugado para 'null' no usuário
    await pool.query('UPDATE users SET livro_alugado = NULL WHERE id = $1', [userID]);

    // Atualiza o status do livro para 'Disponível'
    await pool.query('UPDATE books SET status = $1 WHERE id = $2', ["Disponível", bookID]);

    // Retorna as informações atualizadas do livro
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookID]);
    return result.rows[0];
}

// async function devolveLivro(bookID, userID) {
//     await pool.query('UPDATE users SET livro_alugado = NULL WHERE id = $1', [userID]);
//     const result = await pool.query(
//         'UPDATE books SET status = $1 WHERE id = $2 AND status = $3 RETURNING *', 
//         ["Disponível", bookID, "Alugado"]
//     );
//     if (result.rows.length === 0) {
//         throw {id: 400, msg: "Livro não está alugado ou não encontrado."};
//     }
//     return result.rows[0];
// }

// async function devolveLivro(bookID) {
//     const result = await pool.query('UPDATE books SET status = $1 WHERE id = $2 AND status = $3 RETURNING *', 
//     ["Disponível", bookID, "Alugado"]
//     );
//     if (result.rows.length === 0) {
//         throw {id: 400, msg: "Livro não está alugado ou não encontrado."};
//     }
//     return result.rows[0];
// }

async function statusLivro(bookID) {
    const result = await pool.query('SELECT * FROM alugueis WHERE book_id = $1 AND data_devolucao IS NULL',
    [bookID]);
    if (result.rows.length > 0) {
        return 'Alugado';
    } else {
        return 'Disponível';
    }
}

function buscarLivroPorNome(nome) {
    const buscaLivro = livro.find(livro => livro.nome == nome);
    if (buscaLivro) {
        return buscaLivro;
    } else {
        throw new Error("Livro não encontrado.");
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
    getLivros,
    addLivro,
    livroExiste,
    removeLivro,
    atualizaLivro,
    alugaLivro,
    devolveLivro,
    statusLivro,
    getLivroId,
    buscarLivroPorNome
}