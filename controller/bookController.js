const bookService = require('../service/bookService');

async function listLivros(req, res) {
    try {
        const listaLivro = await bookService.listLivros();
        res.json(listaLivro);
    } catch (err) {
        const statusCode = err.id || 500;
        res.status(statusCode).json({msg: err.msg || 'Erro ao buscar livros!'});
    }
}

async function addLivro(req, res) {
    try {
        const {titulo, autor} = req.body;
        const novoLivro = await bookService.addLivro(titulo, autor);
        res.status(201).json({msg: `Livro  '${novoLivro.titulo}' adicionado com sucesso!`});
    } catch (err) {
        const statusCode = err.id || 500;
        res.status(statusCode).json({msg: err.msg || 'Erro ao adicionar livro!'});
    }
}

async function removeLivro(req, res) {
    try {
        const id = req.params.id;
        const livroDeletado = await bookService.removeLivro(id);
        res.status(200).json({msg: `Livro '${livroDeletado.titulo}' removido com sucesso!`});
    } catch (err) {
        const statusCode = err.id || 500;
        res.status(statusCode).json({msg: err.msg || 'Erro ao remover livro!'});
    }
}
 
async function atualizaLivro(req, res){
    try{
        const id = req.params.id;
        const {titulo, autor} = req.body;
        const livroAtualizado = await bookService.atualizaLivro(id, titulo, autor);
        res.status(200).json({msg: `Livro '${livroAtualizado.titulo}' atualizado com sucesso!`});
    } catch(err){
        const statusCode = err.id || 500;
        res.status(statusCode).json({msg: err.msg || 'Erro ao atualizar livro!'});
    }
}

async function alugaLivro(req, res){
    try {
        const bookId = req.params.bookID;
        const userId = req.usuario.userId;
        const aluguel = await bookService.alugaLivro(bookId, userId);
        res.status(200).json({msg: `Livro '${aluguel.titulo}' alugado com sucesso!`});
    } catch(err) {
        res.status(err.id || 500).json({msg: err.msg || 'Erro interno do servidor'});
    }
}    

async function devolveLivro(req, res){
    try {
        const bookId = req.params.bookID;
        const userId = req.usuario.userid;
        const devolucao = await bookService.devolveLivro(bookId, userId);
        res.status(200).json({msg: `Livro '${devolucao.titulo}' devolvido com sucesso!`});
    } catch(err) {
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

async function getLivroId(req, res){
    const id = req.params.id;
    try{
        const livro = await bookService.getLivroId(id);
        res.status(200).json(livro);
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

module.exports = {
    listLivros,
    addLivro,
    removeLivro,
    atualizaLivro,
    alugaLivro,
    devolveLivro,
    buscarLivroPorNome,
    getLivroId
}