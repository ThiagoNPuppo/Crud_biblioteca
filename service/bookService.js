const bookRepository = require('../repository/bookRepository');

async function listLivros() {
    return await bookRepository.listLivros();
}

async function addLivro(titulo, autor) {
    const existe = await bookRepository.livroExiste(titulo, autor);
    if (existe) {
        throw { id: 400, msg: 'Livro já cadastrado!' };
    } else if (!titulo || !autor) {
        throw { id: 400, msg: 'Faltam informações para adicionar o livro!' };
    } else {
        return await bookRepository.addLivro(titulo, autor);
    }
}

async function removeLivro(id) {
    if (!id) {
        throw { id: 400, msg: 'É necessário informar o ID do livro!' };
    }
    return await bookRepository.removeLivro(id);
}
 
async function atualizaLivro(id, titulo, autor) {
    if (!id || !titulo || !autor) {
        throw { id: 400, msg: 'Todos os campos são necessários para atualizar o livro!' };
    }    
    return await bookRepository.atualizaLivro(id, titulo, autor);
}


async function alugaLivro(bookID, userID) {
    const livro = await bookRepository.getLivroId(bookID);
    if (!livro || livro.status !== 'Disponível') {
        throw {id: 400, msg: "Livro não disponível para aluguel."};
    }
    return await bookRepository.alugaLivro(bookID, userID);
}

async function devolveLivro(bookID, userID) {
    return await bookRepository.devolveLivro(bookID, userID);
}

// function buscarLivroPorNome(nome) {
//     try {
//         const livro = bookRepository.buscarLivroPorNome(nome);
//         if (livro) {
//             return livro;
//         } else {
//             throw { id: 404, msg: 'Livro não encontrado!' };
//         }
//     } catch (err) {
//         throw { id: 500, msg: 'Erro ao buscar o livro.' };
//     }
// }

async function getLivroId(id) {
    const livro = await bookRepository.getLivroId(id);
    if (livro) {
        return livro;
    } else {
        throw { id: 404, msg: 'Livro não encontrado!' };
    }
}

module.exports = {
    listLivros,
    addLivro,
    removeLivro,
    atualizaLivro,
    alugaLivro,
    devolveLivro,
    //buscarLivroPorNome,
    getLivroId
}