const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/bookController');
const acessoMiddleware = require('../middleware/acessoMiddleware');


bookRouter.get('/', acessoMiddleware.verificarAcesso, bookController.listLivros);
bookRouter.get('/:id', acessoMiddleware.verificarAcesso, bookController.getLivroId);
bookRouter.post('/', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdm, bookController.addLivro);
bookRouter.delete('/:id', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdm, bookController.removeLivro);
bookRouter.put('/:id', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdm, bookController.atualizaLivro);
bookRouter.put('/aluga/:bookID', acessoMiddleware.verificarAcesso, bookController.alugaLivro);
bookRouter.put('/devolve/:bookID', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdm, bookController.devolveLivro);

module.exports = bookRouter;
