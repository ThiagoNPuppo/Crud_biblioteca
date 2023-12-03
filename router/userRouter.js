const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');
const acessoMiddleware = require('../middleware/acessoMiddleware');

userRouter.get('/', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdm, userController.listUser,)  
userRouter.get('/:id', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdm, userController.getUserId);
userRouter.post('/', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdm, userController.addUser);
userRouter.delete('/:id', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdm, userController.removerUsuario);
userRouter.put('/:id', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdm, userController.atualizarUsuario);


module.exports = userRouter;
