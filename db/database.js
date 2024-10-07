const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'petood.db');
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
    nome_usuario TEXT UNIQUE,
    senha TEXT,
    nome_completo TEXT,
    data_nascimento DATE,
    cpf TEXT UNIQUE,
    razao_social TEXT,
    cnpj TEXT UNIQUE,
    email TEXT,
    endereco TEXT,
    senha_seguranca TEXT,
    is_cpf_cnpj INTEGER,
    is_admin INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS produto_servico (
    idproduto_servico INTEGER PRIMARY KEY AUTOINCREMENT,
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
    idcompra INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_idusuario INTEGER,
    data_compra DATE,
    Total FLOAT,
    FOREIGN KEY (usuario_idusuario) REFERENCES usuario(idusuario)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS item_compra (
    iditem_compra INTEGER PRIMARY KEY AUTOINCREMENT,
    compra_idcompra INTEGER,
    produto_idproduto_servico INTEGER,
    qtd FLOAT,
    preco_unitario FLOAT,
    subtotal FLOAT,
    desconto FLOAT,
    FOREIGN KEY (compra_idcompra) REFERENCES compra(idcompra),
    FOREIGN KEY (produto_idproduto_servico) REFERENCES produto_servico(idproduto_servico)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS help_desk (
    idhelp_desk INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao_problema TEXT,
    data_solicitacao DATE,
    status TEXT,
    usuario_idusuario INTEGER,
    FOREIGN KEY (usuario_idusuario) REFERENCES usuario(idusuario)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS solicitacoes (
    idsolicitacoes INTEGER PRIMARY KEY AUTOINCREMENT,
    resposta TEXT,
    status TEXT,
    help_desk_idhelp_desk INTEGER,
    FOREIGN KEY (help_desk_idhelp_desk) REFERENCES help_desk(idhelp_desk)
  )`);  
});

db.run('PRAGMA foreign_keys = ON');

module.exports = db;
