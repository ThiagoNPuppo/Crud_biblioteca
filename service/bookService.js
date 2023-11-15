const bookRepository = require('../repository/bookRepository');
const Book = require('../models/books');

function listarLivros() {
    const livros = bookRepository.listarLivros();
    const livroAlugado = livros.map(livro => {
        if (livro.alugado) {
            const {estado, ...livroAlugado} = livro;
            return livroAlugado;
        }
        return livro;
    });
    return livroAlugado;
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

function removerLivro(id) {
    const livroDeletado = bookRepository.removerLivro(id);
    if(livroDeletado){
        return livroDeletado;
    }
    else{
        throw {id: 404, msg: 'Livro não encontrado!'}    
    }
}

function atualizarLivro(id, nome, autor){
    const livroAtualizado = bookRepository.atualizarLivro(id, nome, autor);
    if(livroAtualizado){
        return livroAtualizado;
    }
    else{
        throw {id: 404, msg: 'Livro não encontrado!'}    
    }
    
}


function alugarLivro(ids) {
    const { userID, bookID } = ids;
    const livro = bookRepository.buscarLivroPorId(bookID);
    if (livro) {
        if (!livro.alugado) {
            livro.alugado = true;
            livro.usuarioAluguel = userID;
            return livro;
        } else {
            throw { id: 400, msg: 'Livro já está alugado!' };
        }
    } else {
        throw { id: 404, msg: 'Livro não encontrado!' };
    }
}


function devolverLivro(bookId) {
    const livroAlugadoIndex = bookRepository.livroAlugado.findIndex(l => l.id === bookId);
    if (livroAlugadoIndex === -1) {
        throw { id: 400, msg: 'Livro não está alugado.' };
    }

    bookRepository.livrosDisponiveis.push(bookRepository.livroAlugado[livroAlugadoIndex]);
    bookRepository.livroAlugado.splice(livroAlugadoIndex, 1);
}



function getDisponiveis() {
    try {
        return bookRepository.listarLivrosAlugados();
    } catch (err) {
        throw { id: 500, msg: 'Erro ao listar os livros alugados.' };
    }
}

function getAlugados() {
    try {
        return bookRepository.listarLivrosDisponiveis();
    } catch (err) {
        throw { id: 500, msg: 'Erro ao listar os livros disponíveis.' };
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
    listarLivros,
    adicionarLivro,
    removerLivro,
    atualizarLivro,
    alugarLivro,
    devolverLivro,
    getAlugados,
    getDisponiveis,
    buscarLivroPorNome,
    buscarLivroPorId
}