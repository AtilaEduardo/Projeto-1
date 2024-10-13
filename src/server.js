const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
const cors = require('cors');
const UserController = require('./controllers/UserController');

const app = express();

// Middleware para JSON e CORS
app.use(express.json());
app.use(cors());

// Configuração de sessão com armazenamento em SQLite
app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.sqlite', dir: './src/sessions' }),
    secret: 'secretKey', // Você pode personalizar este segredo
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, 
  })
);

// Rotas
app.post('/login', UserController.login);
app.post('/register', UserController.createUser);

// Iniciar servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
