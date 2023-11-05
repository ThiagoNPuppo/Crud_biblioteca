const express = require('express')
const bookRouter = express.Router()
const bookController = require('../controller/bookController')

app.get('/books', bookController.listarLivros);
app.get('/books/:id', bookController.buscarLivro);
app.post('/books', bookController.adicionarLivro);
app.delete('/books/:id', bookController.removerLivro);
app.put('/books/:id', bookController.atualizarLivro);
app.put('/alugar/:id', bookController.alugarLivro);
app.put('/devolver/:id', bookController.devolverLivro);
app.get('/alugados', bookController.listarLivrosAlugados);
app.get('/disponiveis', bookController.listarLivrosDisponiveis);

module.exports = bookRouter;
