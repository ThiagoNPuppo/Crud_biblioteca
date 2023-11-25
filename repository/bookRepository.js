const pool = require('../db');

async function getLivros() {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
}

function adicionarLivro(novoLivro) {
    livro.push(novoLivro);
}

async function alugaLivro(bookID, userID) {
    const result = await pool.query('UPDATE books SET status = $1 WHERE id = $2 AND status = $3 RETURNING *',
    ["Alugado", bookID, "Disponível"]
    );
    if (result.rows.length === 0) {
        throw {id: 400, msg: "Livro não disponível para aluguel."};
    }
    return result.rows[0];
}    
//     const livroAlugado = livro.find(livro => livro.id == bookID && livro.estado == "Alugado");
//     if (livroAlugado) {
//         throw {id: 400, msg: "Livro não disponível para aluguel."};
//     }    
//     const index = livro.findIndex(livro => livro.id == bookID);
//     if (index === -1) {
//         throw new Error("Livro não encontrado.");
//     }
//     livro[index].estado = "Alugado"; 
//     livro[index].usuarioAluguel = userID; 
//     return livro[index];
// }

async function devolveLivro(bookID) {
    const result = await pool.query('UPDATE books SET status = $1 WHERE id = $2 AND status = $3 RETURNING *', 
    ["Disponível", bookID, "Alugado"]
    );
    return result.rows[0];
}
    // const index = livro.findIndex(livro => livro.id == bookID);
    // if (index === -1) {
    //     throw new Error("Livro não encontrado.");
    // }
    // if (livro[index].estado == "Disponível") {
    //     throw {id: 400, msg: "Livro não está alugado."};
    // }

    // livro[index].estado = "Disponível"; 
    // delete livro[index].usuarioAluguel; 
    // return livro[index];

async function statusLivro(bookID) {
    const result = await pool.query('SELECT * FROM alugueis WHERE book_id = $1 AND data_devolucao IS NULL',
    [bookID]);
    if (result.rows.length > 0) {
        return 'Alugado';
    } else {
        return 'Disponível';
    }
}

function removeLivro(id) {
    for(let ind in livro){
        if(livro[ind].id == id){
            return livro.splice(ind, 1);
        }
    }
}
function atualizaLivro(id, nome, autor){
    for(let ind in livro){
        if(livro[ind].id == id){
            livro[ind].nome = nome;
            livro[ind].autor = autor;
            return livro[ind];
        }
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

function buscarLivroPorId(id) {
    const buscaLivro = livro.find(livro => livro.id == id);
    if (buscaLivro) {
        return buscaLivro;
    } else {
        throw new Error("Livro não encontrado.");
    }
}


module.exports = {
    getLivros,
    adicionarLivro,
    alugaLivro,
    devolveLivro,
    statusLivro,
    removeLivro,
    buscarLivroPorId,
    buscarLivroPorNome,
    atualizaLivro
}
