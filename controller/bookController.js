const bookService = require('../service/bookService');

function listarLivros(req, res) {
    try {
        const listaLivro = bookService.listarLivros();
        res.json(listaLivro);
    } catch (err) {
        res.status(err.id).json({msg: err.msg});
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
        const livro = bookService.alugarLivro(id);
        res.status(200).json({msg: 'Livro' + livro.nome + 'alugado com sucesso!'});
    } catch(err){
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
    try{
        const listarAlugados = bookService.listarLivrosAlugados();
        res.json(listarAlugados);
    }catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function listarLivrosDisponiveis(req, res){
    try{
        const listarDisponiveis = bookService.listarLivrosDisponiveis();
        res.json(listarDisponiveis);
    } catch(err){
        res.status(err.id).json({msg: err.msg});
    } 
}

function buscarLivro(req, res){
    const nome = req.params.nome;
    try{
        const livro = bookService.buscarLivro(nome);
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