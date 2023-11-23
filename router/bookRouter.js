const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/bookController');


bookRouter.get('/', bookController.getLivros);
bookRouter.get('/:id', bookController.buscarLivroPorId);
bookRouter.get('/nome/:nome', bookController.buscarLivroPorNome);
bookRouter.post('/', bookController.adicionarLivro);
bookRouter.delete('/:id', bookController.removeLivro);
bookRouter.put('/:id', bookController.atualizaLivro);
bookRouter.put('/aluga/:idbook/:idUser', bookController.alugaLivro);
bookRouter.put('/devolve/:bookID', bookController.devolveLivro);

module.exports = bookRouter;
