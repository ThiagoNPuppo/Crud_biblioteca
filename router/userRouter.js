const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');
const acessoMiddleware = require('../middleware/acessoMiddleware');

userRouter.get('/', userController.getUsuarios);
userRouter.get('/:id', userController.getUserId);
userRouter.post('/', userController.adicionarUsuario)
userRouter.delete('/:id', userController.removerUsuario);
userRouter.put('/:id', userController.atualizarUsuario);
userRouter.post('/login', userController.loginUser);


module.exports = userRouter;
