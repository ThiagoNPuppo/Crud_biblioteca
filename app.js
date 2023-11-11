const express = require('express');
const userRouter = require('./router/userRouter');
const bookRouter = require('./router/bookRouter');
const acessoMiddleware = require('./middleware/acessoMiddleware')
const loginRouter = require('./router/loginRouter');
const User = require('./models/user');
const Book = require('./models/book');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log('Metodo '+ req.method);
    next();
  })

app.get('/', (req, res) => {
    res.send('Bem vindo a Biblioteca Master!')
});

app.use('/login', loginRouter);

app.use('/users', acessoMiddleware.verificarAcesso, userRouter);
app.use('/books', acessoMiddleware.verificarAcesso, bookRouter);


app.listen(port, () => {
    console.log(`Porta ${port} bombando!!!`);
  });

  module.exports = app;