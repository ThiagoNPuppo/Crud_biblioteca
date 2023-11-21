class Book {
    constructor(id, nome, autor) {
        this.id = id;
        this.nome = nome;
        this.autor = autor;
        this.estado = "Disponível";
    }
}

module.exports = Book;