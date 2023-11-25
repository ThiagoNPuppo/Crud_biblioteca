CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
	telefone VARCHAR(25) UNIQUE,
	email VARCHAR(25) UNIQUE,
	senha VARCHAR(255) NOT NULL,
	is_admin BOOLEAN DEFAULT false
);

INSERT INTO books (titulo, autor) VALUES ('A comédia', 'Engraçadinho');
INSERT INTO books (titulo, autor) VALUES ('Grêmio', 'Tricolor gremista');
iNSERT INTO books (titulo, autor) VALUES ('A casa monstro', 'Monstro Alfa');

