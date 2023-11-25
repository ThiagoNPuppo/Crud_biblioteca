const express = require('express');
const userRouter = require('./router/userRouter');
const bookRouter = require('./router/bookRouter');
const loginRouter = require('./router/loginRouter');
const acessoMiddleware = require('./middleware/acessoMiddleware')


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
app.use('/users', userRouter);
app.use('/books', bookRouter);

app.listen(port, () => {
    console.log(`Porta ${port} bombando!!!`);
  });


module.exports = app;
