const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');
const acessoMiddleware = require('../middleware/acessoMiddleware');
//const createUserController = require('../service/createUser');

//userRouter.post('/teste', acessoMiddleware.verificarAcesso, createUserController.createUser);
userRouter.get('/', acessoMiddleware.verificaAdministrador, acessoMiddleware.verificarAcesso, userController.listUser, (req, res) => {
    console.log('rota de adm acessada')});
userRouter.get('/:id', acessoMiddleware.verificarAcesso, userController.getUserId);
userRouter.post('/', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdministrador, userController.addUser);
userRouter.delete('/:id', acessoMiddleware.verificarAcesso, acessoMiddleware.verificaAdministrador, userController.removerUsuario);
userRouter.put('/:id', userController.atualizarUsuario);


module.exports = userRouter;
