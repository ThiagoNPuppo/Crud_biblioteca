const bookService = require('../service/bookService');

async function getLivros(req, res) {
    try {
        const listaLivro = await bookService.getLivros();
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
    
    // console.log("Dados recebidos para atualização:", req.body);
    // const id = req.params.id;
    // const {nome, autor} = req.body;
    // try{
    //     bookService.atualizaLivro(id, nome, autor);
    //     res.status(200).json({msg: 'Livro atualizado com sucesso!'});
    // }
    // catch(err){
    //     console.error('Erro ao atualizar livro:', err);
    //     const statusCode = err.id || 500;
    //     res.status(statusCode).json({msg: err.msg});
    // }


async function alugaLivro(req, res){
    try{
        const {userID, bookID} = req.params;
        const aluguel = await bookService.alugaLivro(userID, bookID);
        res.status(200).json({msg: 'Livro ' + aluguel.livro.nome + ' alugado com sucesso!'});
    } catch(err){
        res.status(err.id || 500).json({msg: err.msg || 'Erro interno do servidor'});
    }
}
//     const ids = { userID: req.params.idUser, bookID: req.params.idbook };
//     try{
//         const livro = bookService.alugaLivro(ids);
//         res.status(200).json({msg: 'Livro ' + livro.nome + ' alugado com sucesso!'});
//     } catch(err){
//         res.status(err.id || 500).json({msg: err.msg || 'Erro interno do servidor'});
//     }
// }

function devolveLivro(req, res){
    try {
        const aluguelID = req.params.bookID;
        const aluguel = bookService.devolveLivro(aluguelID);
        res.status(200).json({msg: 'Livro ' + aluguel.livro.nome + ' devolvido com sucesso!'});
    } catch (err) {
        res.status(err.id || 500).json({msg: err.msg || 'Erro interno do servidor'});
    }
}
//     const bookID = req.params.bookID;
//     try{
//         const livro = bookService.devolveLivro(bookID);
//         res.status(200).json({msg: 'Livro ' + livro.nome + ' devolvido com sucesso!'});
//     } catch(err){
//         res.status(err.id || 500).json({msg: err.msg || 'Erro interno do servidor'});
//     }
// }

async function statusLivro(req, res){
    try{
        const bookID = req.params.id;
        const status = await bookService.statusLivro(bookID);
        res.json({msg: 'Livro ' + status.livroID + ' está ' + status.status});
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

function getLivroId(req, res){
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
    addLivro,
    removeLivro,
    atualizaLivro,
    alugaLivro,
    devolveLivro,
    statusLivro,
    buscarLivroPorNome,
    getLivroId
}