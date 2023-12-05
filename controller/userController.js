const userService = require('../service/userService');
const jwt = require('jsonwebtoken');

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

// async function addUser(req, res) {
//     try {
//         const usuarioAdicionado = await userService.addUser(novoUsuario);
//         const { senhahash, ...usuarioSemSenha } = usuarioAdicionado;
//         res.status(201).json({ msg: 'Usuário adicionado com sucesso!', usuario: usuarioSemSenha });
//     } catch (err) {
//         const statusCode = err.id || 500;
//         res.status(statusCode).json({ msg: err.msg || 'Erro interno do servidor' });
//     }
// }

    //para adicionar usuario só se for admin
async function addUser(req, res) {
    console.log('teste add user controller...');
    const usuarioAutenticado = req.usuario;
    const novoUsuario = req.body;
    console.log('usuario autenticado: ', usuarioAutenticado);
    try{
        if(!usuarioAutenticado || !usuarioAutenticado.is_admin){
            return res.status(403).json({msg: 'Acesso negado! Apenas administradores podem adicionar usuários.'});
        }
        const usuarioAdicionado = await userService.addUser(novoUsuario);
        const { senhahash, ...usuarioSemSenha } = usuarioAdicionado;
        res.status(201).json({ msg: 'Usuário adicionado com sucesso!', usuario: usuarioSemSenha });
    } catch (err) {
        const statusCode = err.status || 500;
        res.status(statusCode).json({ msg: err.msg || 'Erro interno do servidor' });
    }
}


async function removerUsuario(req, res) {
    const id = req.params.id;
    try{
        await userService.removerUsuario(id);
        res.status(200).json({msg: 'Usuário removido com sucesso!'});
    }
    catch(err){
        const statusCode = err.id || 500;
        res.status(statusCode).json({msg: err.msg || 'Erro interno do servidor'});
    }
}

async function atualizarUsuario(req, res){
    const id = req.params.id;
    const {nome, telefone, email, senha} = req.body;
    try{
        await userService.atualizarUsuario(id, nome, telefone, email, senha);
        res.status(200).json({msg: 'Usuário atualizado com sucesso!'});
    }
    catch(err){
        const statusCode = err.id || 500;
        res.status(statusCode).json({msg: err.msg || 'Erro interno do servidor'});
    }
}

async function getUserName(req, res) {
    try {
        const nome = req.body.nome;
        const usuarios = await userService.getUsuarioPorNome(nome);
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao buscar usuário pelo nome' });
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

async function gerarToken(usuario) {
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        is_admin: usuario.is_admin // incluir a informação se é admin ou não
    };
    return await jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Expira em 1 hora
}


module.exports = {
    listUser,
    addUser,
    removerUsuario,
    atualizarUsuario,
    getUserId,
    gerarToken
}