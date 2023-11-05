const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')

app.get('/users', userController.listarUsuarios);
app.get('/users/:id', userController.buscarUsuario);
app.post('/users', userController.adicionarUsuario);
app.delete('/users/:id', userController.removerUsuario);
app.put('/users/:id', userController.atualizarUsuario);


module.exports = userRouter;
