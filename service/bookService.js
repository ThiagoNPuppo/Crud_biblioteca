const repositoryb = require('../repository/bookRepository');
const Book = require('../models/books');

function listarLivros() {
    return repositoryb.listarLivros();
}

function adicionarLivro(nome, autor) {
    if(nome && autor){
        const id = repositoryb.geraId();
        const novoLivro = new Book(id, nome, autor);
        return repositoryb.adicionarLivro(novoLivro);
    }    
    else{
        throw {id: 400, msg: 'Faltam informações para adicionar o livro!'}
    }
}

function removerLivro(id) {
    const livroDeletado = repositoryb.removerLivro(id);
    if(livroDeletado){
        return livroDeletado;
    }
    else{
        throw {id: 404, msg: 'Livro não encontrado!'}    
    }
}

function atualizarLivro(id, nome, autor){
    const livroAtualizado = repositoryb.atualizarLivro(id, nome, autor);
    if(livroAtualizado){
        return livroAtualizado;
    }
    else{
        throw {id: 404, msg: 'Livro não encontrado!'}    
    }
    
}


function alugarLivro(userID, bookId) {
    const livro = repository.buscarLivroPorId(bookId);
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
    const livroAlugadoIndex = repositoryb.livroAlugado.findIndex(l => l.id === bookId);
    if (livroAlugadoIndex === -1) {
        throw { id: 400, msg: 'Livro não está alugado.' };
    }

    repositoryb.livrosDisponiveis.push(repositoryb.livroAlugado[livroAlugadoIndex]);
    repositoryb.livroAlugado.splice(livroAlugadoIndex, 1);
}



function listarLivrosAlugados() {
    try {
        return repositoryb.listarLivrosAlugados();
    } catch (err) {
        throw { id: 500, msg: 'Erro ao listar os livros alugados.' };
    }
}

function listarLivrosDisponiveis() {
    try {
        return repositoryb.listarLivrosDisponiveis();
    } catch (err) {
        throw { id: 500, msg: 'Erro ao listar os livros disponíveis.' };
    }
}

function buscarLivroPorNome(nome) {
    try {
        const livro = repositoryb.buscarLivroPorNome(nome);
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
    listarLivrosAlugados,
    listarLivrosDisponiveis,
    buscarLivroPorNome
}