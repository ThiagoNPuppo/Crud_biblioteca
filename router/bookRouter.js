const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/bookController');
const acessoMiddleware = require('../middleware/acessoMiddleware');


bookRouter.get('/', acessoMiddleware.verificarAcesso, bookController.listLivros);
bookRouter.get('/:id', bookController.getLivroId);
bookRouter.post('/', acessoMiddleware.verificarAcesso, bookController.addLivro);
//bookRouter.delete('/', acessoMiddleware.verificarAcesso, (req, res) => {
//    res.status(400).json({ msg: 'É necessário informar o ID do livro para remover.' });
bookRouter.delete('/:id', bookController.removeLivro);
bookRouter.put('/:id', acessoMiddleware.verificarAcesso, bookController.atualizaLivro);
bookRouter.put('/aluga/:bookID/:userID', bookController.alugaLivro);
bookRouter.put('/devolve/:bookID/:userID', bookController.devolveLivro);

module.exports = bookRouter;
