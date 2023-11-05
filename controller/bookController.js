const bookService = require('../service/bookService');

function listarLivros(req, res) {
    const listaLivro = bookService.listarLivros();
    res.json(listaLivro);
}

function adicionarLivro(req, res) {
    const {nome, autor} = req.body;
    const livro = {nome, autor};
    try{
        bookService.adicionarLivro(livro);
        res.status(201).json({msg: 'Livro adicionado com sucesso!'});
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function removerLivro(req, res) {
    const id = req.params.id;
    try{
        bookService.removerLivro(id);
        res.status(200).json({msg: 'Livro removido com sucesso!'});
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function atualizarLivro(req, res){
    const id = req.params.id;
    const {nome, autor} = req.body;
    try{
        bookService.atualizarLivro(id, nome, autor);
        res.status(200).json({msg: 'Livro atualizado com sucesso!'});
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function alugarLivro(req, res){
    const id = req.params.id;
    try{
        bookService.alugarLivro(id);
        res.status(200).json({msg: 'Livro alugado com sucesso!'});
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function devolverLivro(req, res){
    const id = req.params.id;
    try{
        bookService.devolverLivro(id);
        res.status(200).json({msg: 'Livro devolvido com sucesso!'});
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function listarLivrosAlugados(req, res){
    const listarAlugados = bookService.listarLivrosAlugados();
    res.json(listarAlugados);
}

function listarLivrosDisponiveis(req, res){
    const livrosDisponiveis = bookService.listarLivrosDisponiveis();
    res.json(livrosDisponiveis);
}

function buscarLivro(req, res){
    const id = req.params.id;
    try{
        const livro = bookService.buscarLivro(id);
        res.status(200).json(livro);
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
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