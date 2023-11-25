const bookRepository = require('../repository/bookRepository');

function getLivros() {
    return bookRepository.getLivros();
    // const livros = bookRepository.getLivros();
    // const livroAlugado = livros.map(livro => {
    //     if (livro.alugado) {
    //         const {estado, ...livroAlugado} = livro;
    //         return livroAlugado;
    //     }
    //     return livro;
    // });
    // return livroAlugado;
}

function adicionarLivro(nome, autor) {

    if(nome && autor){
        const id = bookRepository.geraId();
        const novoLivro = new Book(id, nome, autor);
        return bookRepository.adicionarLivro(novoLivro);
    }    
    else{
        throw {id: 400, msg: 'Faltam informações para adicionar o livro!'}
    }
 }

function removeLivro(id) {
    const livroDeletado = bookRepository.removerLivro(id);
    if(livroDeletado){
        return livroDeletado;
    }
    else{
        throw {id: 404, msg: 'Livro não encontrado!'}    
    }
}

function atualizaLivro(id, nome, autor){
    const livroAtualizado = bookRepository.atualizaLivro(id, nome, autor);
    if(livroAtualizado){
        return livroAtualizado;
    }
    else{
        throw {id: 404, msg: 'Livro não encontrado!'}    
    }
    
}

async function alugaLivro(bookID, userID) {
    const livroAlugado = await bookRepository.statusLivro(bookID);
    if (livroAlugado) {
        throw {id: 400, msg: "Livro não disponível para aluguel."};
    }
    return await bookRepository.alugaLivro(bookID, userID);
}
//     const { userID, bookID } = ids;
//     try {
//         return bookRepository.alugaLivro(bookID, userID);
//     } catch (err) {
//         throw err;
//     } 
// }

async function devolveLivro(aluguelID) {
    return await bookRepository.devolveLivro(aluguelID);
}
    //     try {
//         return bookRepository.devolveLivro(bookID);
//     } catch (err) {
//         throw err;
//     }
// }
   

async function statusLivro(bookID) {
    const status = await bookRepository.statusLivro(bookID);
    if (status) {
        return { livroID: bookID, status: status };
    } else {
        throw { id: 404, msg: 'Livro não encontrado!' };
    }
}

function buscarLivroPorNome(nome) {
    try {
        const livro = bookRepository.buscarLivroPorNome(nome);
        if (livro) {
            return livro;
        } else {
            throw { id: 404, msg: 'Livro não encontrado!' };
        }
    } catch (err) {
        throw { id: 500, msg: 'Erro ao buscar o livro.' };
    }
}

function buscarLivroPorId(id) {
    try {
        const livro = bookRepository.buscarLivroPorId(id);
        if (livro) {
            return livro;
        } else {
            throw { id: 404, msg: 'Livro não encontrado!' };
        }
    } catch (err) {
        throw { id: 500, msg: 'Erro ao buscar o livro.' };
    }
}

module.exports = {
    getLivros,
    adicionarLivro,
    removeLivro,
    atualizaLivro,
    alugaLivro,
    devolveLivro,
    statusLivro,
    buscarLivroPorNome,
    buscarLivroPorId
}