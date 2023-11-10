const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/bookController');


bookRouter.get('/', bookController.listarLivros);
bookRouter.get('/:id', bookController.buscarLivro);
bookRouter.post('/', bookController.adicionarLivro);
bookRouter.delete('/:id', bookController.removerLivro);
bookRouter.put('/:id', bookController.atualizarLivro);
bookRouter.put('/alugar/:id', bookController.alugarLivro);
bookRouter.put('/devolver/:id', bookController.devolverLivro);
bookRouter.get('/alugados', bookController.listarLivrosAlugados);
bookRouter.get('/disponiveis', bookController.listarLivrosDisponiveis);

module.exports = bookRouter;
