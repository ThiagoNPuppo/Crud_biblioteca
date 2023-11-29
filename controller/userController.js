const userService = require('../service/userService');

async function listUser(req, res) {
    try{
        const usuarios = await userService.listUser();
        const usersSemAdminESenha = usuarios.map(usuario => {
            const { telefone, livro_alugado, is_admin, senhahash, ...usuarioSemInfo } = usuario;
            return usuarioSemInfo;
        });
        res.status(200).json(usersSemAdminESenha);
    } catch (err) {
        const statusCode = err.id || 500;
        res.status(statusCode).json({ msg: err.msg || 'Erro interno do servidor' });
    }
}

async function addUser(req, res) {
    try {
        const novoUsuario = await userService.addUser(req.body);
        const { senha, ...usuarioSemSenha } = novoUsuario;
        res.status(201).json({msg: 'Usuário adicionado com sucesso!', usuario: usuarioSemSenha});
    } catch (err) {
        const statusCode = err.status || 500;
        res.status(statusCode).json({ msg: err.msg || 'Erro interno do servidor' });
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

async function getUserId(req, res){
    const id = req.params.id;    
    try{
        const userBuscado = await userService.getUserId(id);
        const { senhahash, ...usuarioSemSenha } = userBuscado;
        res.status(200).json(usuarioSemSenha);
    }
    catch(err){
        res.status(err.id).json({msg: err.msg});
    }
}

// function buscarUsuario(req, res){
//     const id = req.params.id;
//     try{
//         const userBuscado = userService.buscarUsuario(id);
//         res.status(200).json(userBuscado);
//     }
//     catch(err){
//         res.status(err.id).json({msg: err.msg});
//     }
// }

function loginUser(req, res) {
    const {username, senha} = req.body;
    try{
        const token = userService.loginUser(username, senha);
        res.status(200).json({token: token});
    }
    catch(err){
        const statusCode = err.id || 500;    
        res.status(statusCode).json({msg: err.msg || 'Erro interno do servidor'});
    }
}



module.exports = {
    listUser,
    addUser,
    removerUsuario,
    atualizarUsuario,
    getUserId,
    loginUser,
}