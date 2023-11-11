const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

userRouter.get('/', userController.listarUsuarios);
userRouter.get('/:id', userController.buscarUsuario);
userRouter.post('/', userController.adicionarUsuario);
userRouter.delete('/:id', userController.removerUsuario);
userRouter.put('/:id', userController.atualizarUsuario);
userRouter.post('/registro', userController.adicionarUsuario)
userRouter.post('/login', userController.loginUser);


module.exports = userRouter;
