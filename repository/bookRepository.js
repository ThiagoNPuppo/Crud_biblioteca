let livro = [{
    "id": 1,
    "nome": "O cachaceiro",
    "autor": "Thiago",
    "estado": "disponivel"
},
{
    "id": 2,
    "nome": "Grêmio",
    "autor": "gremista",
    "estado": "disponivel"  
}
];

let livroAlugado = [{
    "id": 1,
    "nome": "O cachaceiro",
    "autor": "Thiago",
    "estado": "alugado"
}];

let livrosDisponiveis = [];
let livrosAlugados = [];
let idLivro = livro.length + 1;

function geraId() {
    return idLivro++;
}

function listarLivros() {
    return livro;
}

function adicionarLivro(novoLivro) {
    livro.push(novoLivro);
    livrosDisponiveis.push(novoLivro);
}

function alugarLivro(bookId, userId) {
    const index = livros.findIndex(livro => livro.id === bookId);
    if (index === -1 || livros[index].alugado) {
        throw new Error("Livro não disponível para aluguel.");
    }
    livrosDisponiveis.splice(index, 1); 
    livros[index].alugado = true; 
    livros[index].userId = userId; 
    livrosAlugados.push(livros[index]); 
    return livros[index];
}

function devolverLivro(bookId) {
    const index = livros.findIndex(livro => livro.id === bookId);
    if (index === -1 || !livros[index].alugado) {
        throw new Error("Livro não está alugado.");
    }

    livros[index].alugado = false; 
    delete livros[index].userId; 
    livrosAlugados = livrosAlugados.filter(livro => livro.id !== bookId); 
    return livros[index];
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

function listarLivrosAlugados(){
    return livroAlugado;
}

function listarLivrosDisponiveis() {
    const livrosDisponiveis = livro.filter(livro => {
        return !livroAlugado.some(alugado => alugado.id === livro.id);
    });
    return livrosDisponiveis;
}

function buscarLivro(id){
    for(let ind in livro){
        if(livro[ind].id == id){
            return livro[ind];
        }
    }
}


module.exports = {
    geraId,
    listarLivros,
    adicionarLivro,
    removerLivro,
    alugarLivro,
    devolverLivro,
    listarLivrosAlugados,
    listarLivrosDisponiveis,
    buscarLivro,
    atualizarLivro
}
