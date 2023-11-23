let livro = [{
    "id": 1,
    "nome": "O cachaceiro",
    "autor": "Thiago",
    "estado": "Disponivel"
},
{
    "id": 2,
    "nome": "Grêmio",
    "autor": "gremista",
    "estado": "Disponivel"  
}
];

let idLivro = livro.length + 1;

function geraId() {
    return idLivro++;
}

function getLivros() {
    return livro;
}

function adicionarLivro(novoLivro) {
    livro.push(novoLivro);
    livrosDisponiveis.push(novoLivro);
}

function alugaLivro(bookID, userID) {
    const livroAlugado = livro.find(livro => livro.id == bookID && livro.estado == "Alugado");
    if (livroAlugado) {
        throw {id: 400, msg: "Livro não disponível para aluguel."};
    }    
    const index = livro.findIndex(livro => livro.id == bookID);
    if (index === -1) {
        throw new Error("Livro não encontrado.");
    }
    livro[index].estado = "Alugado"; 
    livro[index].usuarioAluguel = userID; 
    return livro[index];
}

function devolveLivro(bookID) {
    const index = livro.findIndex(livro => livro.id == bookID);
    if (index === -1) {
        throw new Error("Livro não encontrado.");
    }
    if (livro[index].estado == "Disponível") {
        throw {id: 400, msg: "Livro não está alugado."};
    }

    livro[index].estado = "Disponível"; 
    delete livro[index].usuarioAluguel; 
    return livro[index];
}

function removeLivro(id) {
    for(let ind in livro){
        if(livro[ind].id == id){
            return livro.splice(ind, 1);
        }
    }
}
function atualizaLivro(id, nome, autor){
    for(let ind in livro){
        if(livro[ind].id == id){
            livro[ind].nome = nome;
            livro[ind].autor = autor;
            return livro[ind];
        }
    }
}

function buscarLivroPorNome(nome) {
    const buscaLivro = livro.find(livro => livro.nome == nome);
    if (buscaLivro) {
        return buscaLivro;
    } else {
        throw new Error("Livro não encontrado.");
    }
}

function buscarLivroPorId(id) {
    const buscaLivro = livro.find(livro => livro.id == id);
    if (buscaLivro) {
        return buscaLivro;
    } else {
        throw new Error("Livro não encontrado.");
    }
}


module.exports = {
    geraId,
    getLivros,
    adicionarLivro,
    removeLivro,
    alugaLivro,
    devolveLivro,
    buscarLivroPorId,
    buscarLivroPorNome,
    atualizaLivro
}
