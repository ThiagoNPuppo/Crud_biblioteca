const userService = require('../service/userService');

function listarUsuarios(req, res) {
    const listarUser = userService.listarUsuarios();
    res.json(listarUser);
}

function adicionarUsuario(req, res) {
    const {nome, telefone, senha} = req.body;
    const usuario = {nome, telefone, senha};
    try{
        userService.adicionarUsuario(usuario);
        res.status(201).json({msg: 'Usuário adicionado com sucesso!'});
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function removerUsuario(req, res) {
    const id = req.params.id;
    try{
        userService.removerUsuario(id);
        res.status(200).json({msg: 'Usuário removido com sucesso!'});
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function atualizarUsuario(req, res){
    const id = req.params.id;
    const {nome, telefone} = req.body;
    try{
        userService.atualizarUsuario(id, nome, telefone);
        res.status(200).json({msg: 'Usuário atualizado com sucesso!'});
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function buscarUsuario(req, res){
    const id = req.params.id;
    try{
        const userBuscado = userService.buscarUsuario(id);
        res.status(200).json(userBuscado);
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

function loginUser(req, res) {
    const {username, senha} = req.body;
    try{
        const token = userService.loginUser(username, senha);
        res.status(200).json({token: token});
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}



module.exports = {
    listarUsuarios,
    adicionarUsuario,
    removerUsuario,
    atualizarUsuario,
    buscarUsuario,
    loginUser,
}