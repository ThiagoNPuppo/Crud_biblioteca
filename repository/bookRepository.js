let livro = [{
    "id": 1,
    "nome": "O cachaceiro",
    "autor": "Thiago",
    "estado": "Disponível"
},
{
    "id": 2,
    "nome": "Grêmio",
    "autor": "gremista",
    "estado": "Alugado"  
}
];

// let livrosDisponiveis = [{
//     "id": 1,
//     "nome": "O cachaceiro",
//     "autor": "Thiago",
//     "estado": "disponivel"
// },
// {
//     "id": 2,
//     "nome": "Grêmio",
//     "autor": "gremista",
//     "estado": "disponivel"  
// }];
// let livrosAlugados = [];
let idLivro = livro.length + 1;

function geraId() {
    return idLivro++;
}

function listarLivros() {
    return livro;
}

function adicionarLivro(novoLivro) {
    livro.push(novoLivro);
    //livrosDisponiveis.push(novoLivro);
}

function alugarLivro(bookID, userID) {
    const index = livro.findIndex(livro => livro.id == bookID);
    if (index === -1 || livro[index].estado == "Alugado") {
        throw new Error("Livro não disponível para aluguel.");
    }
    //livrosDisponiveis.splice(index, 1); 
    livro[index].alugado = "Alugado !"; 
    livro[index].userId = userID; 
    //livrosAlugados.push(livro[index]);
    return livro[index];
}

function devolverLivro(bookId) {
    const index = livro.findIndex(livro => livro.id === bookId);
    if (index === -1 || !livro[index].estado == "Alugado") {
        throw new Error("Livro não está alugado.");
    }

    livro[index].estado = "Disponível"; 
    //delete livro[index].userId; 
    //livrosAlugados = livrosAlugados.filter(livro => livro.id !== bookId); 
    return livro[index];
}

function removerLivro(id) {
    for(let ind in livro){
        if(livro[ind].id == id){
            return livro.splice(ind, 1);
        }
    }
}
function atualizarLivro(id, nome, autor){
    for(let ind in livro){
        if(livro[ind].id == id){
            livro[ind].nome = nome;
            livro[ind].autor = autor;
            return livro[ind];
        }
    }
}

// function listarLivrosAlugados(){
//     if (livrosAlugados.length === 0) {
//         throw new Error("Nenhum livro alugado.");
//     }
//     return livrosAlugados;
// }

// function listarLivrosDisponiveis() {
//     if (livrosDisponiveis.length === 0) {
//         throw new Error("Nenhum livro disponível.");
//     }
//     return livrosDisponiveis;
// }

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
    listarLivros,
    adicionarLivro,
    removerLivro,
    alugarLivro,
    devolverLivro,
    //listarLivrosAlugados,
    //listarLivrosDisponiveis,
    buscarLivroPorId,
    buscarLivroPorNome,
    atualizarLivro
}
