const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/bookController');


bookRouter.get('/', bookController.getLivros);
bookRouter.get('/:id', bookController.getLivroId);
bookRouter.get('/nome/:nome', bookController.buscarLivroPorNome);
bookRouter.get('/:id/status', bookController.statusLivro);
bookRouter.post('/', bookController.addLivro);
bookRouter.delete('/', (req, res) => {
    res.status(400).json({ msg: 'É necessário informar o ID do livro para remover.' });
})
bookRouter.delete('/:id', bookController.removeLivro);
bookRouter.put('/:id', bookController.atualizaLivro);
bookRouter.put('/aluga/:bookID/:userID', bookController.alugaLivro);
bookRouter.put('/devolve/:bookID', bookController.devolveLivro);

module.exports = bookRouter;
