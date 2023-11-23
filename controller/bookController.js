const bookService = require('../service/bookService');

function getLivros(req, res) {
    try {
        const listaLivro = bookService.getLivros();
        res.json(listaLivro);
    } catch (err) {
        const statusCode = err.id || 500;
        res.status(statusCode).json({msg: err.msg || 'Erro interno do servidor'});
    }
}

function adicionarLivro(req, res) {
    const {nome, autor} = req.body;
    try{
        const livro = bookService.adicionarLivro(nome, autor);
        res.status(201).json({msg: 'Livro adicionado com sucesso!'});
    }
    catch(err){
        const statusCode = err.id || 500;
        res.status(statusCode).json({ msg: err.msg || 'Erro interno do servidor' });
    }
}

function removeLivro(req, res) {
    const id = req.params.id;
    try{
        bookService.removeLivro(id);
        res.status(200).json({msg: 'Livro removido com sucesso!'});
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function atualizaLivro(req, res){
    console.log("Dados recebidos para atualização:", req.body);
    const id = req.params.id;
    const {nome, autor} = req.body;
    try{
        bookService.atualizaLivro(id, nome, autor);
        res.status(200).json({msg: 'Livro atualizado com sucesso!'});
    }
    catch(err){
        console.error('Erro ao atualizar livro:', err);
        const statusCode = err.id || 500;
        res.status(statusCode).json({msg: err.msg});
    }
}

function alugaLivro(req, res){
    const ids = { userID: req.params.idUser, bookID: req.params.idbook };
    try{
        const livro = bookService.alugaLivro(ids);
        res.status(200).json({msg: 'Livro ' + livro.nome + ' alugado com sucesso!'});
    } catch(err){
        res.status(err.id || 500).json({msg: err.msg || 'Erro interno do servidor'});
    }
}

function devolveLivro(req, res){
    const bookID = req.params.bookID;
    try{
        const livro = bookService.devolveLivro(bookID);
        res.status(200).json({msg: 'Livro ' + livro.nome + ' devolvido com sucesso!'});
    } catch(err){
        res.status(err.id || 500).json({msg: err.msg || 'Erro interno do servidor'});
    }
}

function buscarLivroPorNome(req, res){
    const nome = req.params.nome;
    try{
        const livro = bookService.buscarLivro(nome);
        res.status(200).json(livro);
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function buscarLivroPorId(req, res){
    const id = req.params.id;
    try{
        const livro = bookService.buscarLivroPorId(id);
        res.status(200).json(livro);
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

module.exports = {
    getLivros,
    adicionarLivro,
    removeLivro,
    atualizaLivro,
    alugaLivro,
    devolveLivro,
    buscarLivroPorNome,
    buscarLivroPorId
}