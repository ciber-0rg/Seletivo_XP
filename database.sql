DROP SCHEMA IF EXISTS back_end_XP;
CREATE SCHEMA IF NOT EXISTS back_end_XP;

CREATE TABLE back_end_XP.clients (
	codCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  senha TEXT NOT NULL,
);

INSERT INTO back_end_XP.clients (codCliente, nome, email, senha)
 VALUES
  (1, 'JOAO SILVA', 'joaosilva@gmail.com', '12345678'),
  (2, 'MARIA APARECIDA', 'mariaaparecida@yahoo.com.br', '24681012'),
  (3, 'FELIPE SANTOS', 'felipesantos@msn.com', '87654321');

CREATE TABLE back_end_XP.ativos (
	  codAtivo INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    qtdeAtivo INTEGER NOT NULL,
    valor DEC(10,2) NOT NULL
);

INSERT INTO back_end_XP.ativos (codAtivo, qtdeAtivo, valor)
  VALUES
    (65, 250, 12.50),
    (73, 50, 2.50),
    (76, 10, 200.50);

CREATE TABLE back_end_XP.ativos_por_clientes (
	codCliente INTEGER NOT NULL,
    FOREIGN KEY (codCliente) REFERENCES back_end_XP.clients(codCliente)
    ON DELETE CASCADE,

    codAtivo INTEGER NOT NULL,
    FOREIGN KEY (codAtivo) REFERENCES back_end_XP.ativos(codAtivo)
    ON DELETE CASCADE,

    qtdeAtivo INTEGER NOT NULL,
    # FOREIGN KEY (qtdeAtivo) REFERENCES back_end_XP.ativos(qtdeAtivo)
    #ON DELETE CASCADE,

    valor DECIMAL(10,2) NOT NULL
    #FOREIGN KEY (valor) references back_end_XP.ativos(valor)
    #ON DELETE CASCADE
);

INSERT INTO back_end_XP.ativos_por_clientes (codCliente, codAtivo, qtdeAtivo, valor)
	VALUES
  (1, 65, 100, 12.5),
  (2, 65, 1, 0.5),
  (1, 73, 10, 2.5),
  (3, 76, 5, 200.5);

CREATE TABLE back_end_XP.contas (
	codCliente INTEGER PRIMARY KEY NOT NULL,
    FOREIGN KEY (codCliente) REFERENCES back_end_XP.clients(codCliente),
    saldo DECIMAL(10,2) NOT NULL
);

INSERT INTO BACK_END_XP.CONTAS (CODCLIENTE, SALDO)
VALUES
  (1, 1275.00),
  (1, 0.5),
  (3, 1002.5);
