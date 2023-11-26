CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
	status VARCHAR(20) DEFAULT 'Disponível'
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
	telefone VARCHAR(25) UNIQUE,
	email VARCHAR(25) UNIQUE,
	senhahash VARCHAR(255) NOT NULL,
	is_admin BOOLEAN DEFAULT false
);

INSERT INTO books (titulo, autor) VALUES ('A comédia', 'Engraçadinho');
INSERT INTO books (titulo, autor) VALUES ('Grêmio', 'Tricolor gremista');
iNSERT INTO books (titulo, autor) VALUES ('A casa monstro', 'Monstro Alfa');


INSERT INTO users (nome, telefone, email, senhahash, is_admin) 
VALUES ('Thiago Nunes Puppo', '51984293231', 'thiagopuppo@gmail.com', '$2a$04$SiIE8T4xYBHlReaApWysw.rFBQgw2rRhHu66BS8czavt5m5tp4mPG', true);

INSERT INTO users (nome, telefone, email, senhahash)
VALUES ('Thiago', '5199999', 'thiago@gmail.com', '1234');


select * from books
select * from users
