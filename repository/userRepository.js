let usuarios = [];
let idUser = 1;

function geraId() {
    return idUser++;
}

function listarUsuarios() {
    return usuarios;
}

function adicionarUsuario(usuario) {
    usuario.id = geraId();
    usuarios.push(usuario);
}

function removerUsuario(id) {
    for(let ind in usuarios){
        if(usuarios[ind].id == id){
            return usuarios.splice(ind, 1);
        }
    }
}

function atualizarUsuario(id, nome, telefone) {
    id = parseInt(id);
    for(let i in usuarios){
        if(usuarios[i].id === id){
            usuarios[i].nome = nome;
            usuarios[i].telefone = telefone;
            return usuarios[i];
        }
    }
}

function buscarUsuario(id) {
    for(let i in usuarios){
        if(usuarios[i].id == id){
            return usuarios[i];
        }
    }
}

module.exports = {
    listarUsuarios,
    adicionarUsuario,
    removerUsuario,
    atualizarUsuario,
    buscarUsuario

}