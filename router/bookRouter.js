const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/bookController');


bookRouter.get('/', bookController.listarLivros);
bookRouter.get('/:id', bookController.buscarLivro);
bookRouter.post('/', bookController.adicionarLivro);
bookRouter.delete('/:id', bookController.removerLivro);
bookRouter.put('/:id', bookController.atualizarLivro);
bookRouter.put('/aluga/:id', bookController.alugarLivro);
bookRouter.put('/devolve/:id', bookController.devolverLivro);
bookRouter.get('/alugados', bookController.listarLivrosAlugados);
bookRouter.get('/disponiveis', bookController.listarLivrosDisponiveis);

module.exports = bookRouter;
