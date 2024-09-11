const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco de dados
const dbPath = path.resolve(__dirname, 'kogtcg.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err);
  } else {
    console.log('Banco de dados conectado.');
  }
});

// Criar tabelas se não existirem
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuario (
    idusuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_usuario TEXT,
    senha TEXT,
    nome_completo TEXT,
    data_nascimento DATE,
    cpf TEXT,
    email TEXT,
    endereco TEXT,
    senha_seguranca TEXT,
    is_admin INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS produto (
    idproduto INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    descricao TEXT,
    preco REAL,
    estoque INTEGER,
    data_cadastro DATETIME,
    oferta_diaria INTEGER,
    promocoes_cupons INTEGER,
    usuario_idusuario INTEGER,
    FOREIGN KEY (usuario_idusuario) REFERENCES usuario(idusuario)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS compra (
    idcompra INT AUTO_INCREMENT PRIMARY KEY,
    usuario_idusuario INT,
    data_compra DATE,
    Total FLOAT,
    FOREIGN KEY (usuario_idusuario) REFERENCES usuario(idusuario)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS item_compra (
    iditem_compra INT AUTO_INCREMENT PRIMARY KEY,
    compra_idcompra INT,
    produto_idproduto INT,
    qtd FLOAT,
    preco_unitario FLOAT,
    subtotal FLOAT,
    desconto FLOAT,
    FOREIGN KEY (compra_idcompra) REFERENCES compra(idcompra),
    FOREIGN KEY (produto_idproduto) REFERENCES produto(idproduto)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS help_desk (
    idhelp_desk INT AUTO_INCREMENT PRIMARY KEY,
    descricao_problema VARCHAR(45),
    data_solicitacao DATE,
    status VARCHAR(45),
    usuario_idusuario INT,
    FOREIGN KEY (usuario_idusuario) REFERENCES usuario(idusuario)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS solicitacoes (
    idsolicitacoes INT AUTO_INCREMENT PRIMARY KEY,
    resposta VARCHAR(45),
    status VARCHAR(45),
    help_desk_idhelp_desk INT,
    FOREIGN KEY (help_desk_idhelp_desk) REFERENCES help_desk(idhelp_desk)
  )`);
});

module.exports = db;