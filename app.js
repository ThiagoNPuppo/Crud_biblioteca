const express = require('express');
//const userRouter = require('./router/userRouter');
//const bookRouter = require('./router/bookRouter');
const userController = require('./controller/userController');
const bookController = require('./controller/bookController');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem vindo a Biblioteca Master!')
});



//app.use('/users', userRouter);
//app.use('/books', bookRouter);


app.get('/users', userController.listarUsuarios);
app.get('/users/:id', userController.buscarUsuario);
app.post('/users', userController.adicionarUsuario);
app.delete('/users/:id', userController.removerUsuario);
app.put('/users/:id', userController.atualizarUsuario);

app.get('/books', bookController.listarLivros);
app.get('/books/:id', bookController.buscarLivro);
app.post('/books', bookController.adicionarLivro);
app.delete('/books/:id', bookController.removerLivro);
app.put('/books/:id', bookController.atualizarLivro);
app.put('/alugar/:id', bookController.alugarLivro);
app.put('/devolver/:id', bookController.devolverLivro);
app.get('/alugados', bookController.listarLivrosAlugados);
app.get('/disponiveis', bookController.listarLivrosDisponiveis);



app.listen(port, () => {
    console.log(`Porta ${port} bombando!!!`);
  });

