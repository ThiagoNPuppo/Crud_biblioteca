const userService = require('../service/userService');

async function getUsuarios(req, res) {
    try{
        const usuarios = await userService.getUsuarios();
        const usersSemAdminESenha = usuarios.map(usuario => {
            const { is_admin, senhahash, ...usuarioSemInfo } = usuario;
            return usuarioSemInfo;
        });
        res.status(200).json(usersSemAdminESenha);
    } catch (err) {
        const statusCode = err.id || 500;
        res.status(statusCode).json({ msg: err.msg || 'Erro interno do servidor' });
    }
}

async function adicionarUsuario(req, res) {
    try {
        const novoUsuario = await userService.adicionarUsuario(req.body);
        const { senha, ...usuarioSemSenha } = novoUsuario;
        res.status(201).json({msg: 'Usuário adicionado com sucesso!', usuario: usuarioSemSenha});
    } catch (err) {
        const statusCode = err.status || 500;
        res.status(statusCode).json({ msg: err.msg || 'Erro interno do servidor' });
    }
}

//     const {nome, telefone, senha} = req.body;
//     const usuario = {nome, telefone, senha};
//     try{
//         userService.adicionarUsuario(usuario);
//         res.status(201).json({msg: 'Usuário adicionado com sucesso!'});
//     }
//     catch(err){
//         res.status(err.id).json({msg: err.msg});
//     }
// }

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
        const { senha, ...usuarioSemSenha } = userBuscado;
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
    getUsuarios,
    adicionarUsuario,
    removerUsuario,
    atualizarUsuario,
    getUserId,
    loginUser,
}