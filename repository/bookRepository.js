let livro = [{
    "nome": "O cachaceiro",
    "autor": "Thiago",
    "id": 1,
},
{
    "nome": "Grêmio",
    "autor": "gremista",
    "id": 2,
}
];
let idLivro = livro.length + 1;
let livroAlugado = [{
    "nome": "O cachaceiro",
    "autor": "Thiago",
    "id": 1,
}];
let livroDevolvido = [];
let livrosDisponiveis = [];


function geraId() {
    return idLivro++;
}

function listarLivros() {
    return livro;
}

function adicionarLivro(novoLivro) {
    novoLivro.id = geraId();
    livro.push(novoLivro);
    livrosDisponiveis.push(novoLivro);
}

function alugarLivro(id){
    for(let ind in livro){
        if(livro[ind].id == id){
            livroAlugado.push(livro[ind]);            
            console.log("livroAlugado", livroAlugado);
            return livrosDisponiveis.splice(ind, 1);
        }
    }
}

function devolverLivro(id){
    for(let ind in livroAlugado){
        if(livroAlugado[ind].id == id){
            livroDevolvido.push(livroAlugado[ind]);
            livrosDisponiveis.push(livroAlugado[ind]);
            return livroAlugado.splice(ind, 1);
        }
    }
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
