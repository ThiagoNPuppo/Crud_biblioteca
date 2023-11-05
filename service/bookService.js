const repositoryb = require('../repository/bookRepository');

function listarLivros() {
    return repositoryb.listarLivros();
}

function adicionarLivro(livro) {
    if(livro && livro.nome && livro.autor){
        repositoryb.adicionarLivro(livro);
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

function alugarLivro(id){
    const livroAlugado = repositoryb.alugarLivro(id);
    if(livroAlugado){
        return livroAlugado;
    }
    else{
        throw {id: 404, msg: 'Livro não encontrado!'}    
    }
    
}

function devolverLivro(id){
    const livroDevolvido = repositoryb.devolverLivro(id);
    if(livroDevolvido){
        return livroDevolvido;
    }
    else{
        throw {id: 404, msg: 'Livro não encontrado!'}    
    }
    
}

function listarLivrosAlugados(){
    return repositoryb.listarLivrosAlugados();
}

function listarLivrosDisponiveis(){
    return repositoryb.listarLivrosDisponiveis();
}

function buscarLivro(id){
    const livro = repositoryb.buscarLivro(id);
    if(livro){
        return livro;
    }
    else{
        throw {id: 404, msg: 'Livro não encontrado!'}    
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
    buscarLivro
}