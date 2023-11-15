const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/bookController');


bookRouter.get('/', bookController.listarLivros);
bookRouter.get('/:id', bookController.buscarLivroPorId);
bookRouter.get('/nome/:nome', bookController.buscarLivroPorNome);
bookRouter.post('/', bookController.adicionarLivro);
bookRouter.delete('/:id', bookController.removerLivro);
bookRouter.put('/:id', bookController.atualizarLivro);
bookRouter.put('/aluga/:idbook/:idUser', bookController.alugarLivro);
bookRouter.put('/devolve/:idbook/:idUser', bookController.devolverLivro);
bookRouter.get('/alugados', bookController.listarLivrosAlugados);
bookRouter.get('/disponiveis', bookController.listarLivrosDisponiveis);

module.exports = bookRouter;
