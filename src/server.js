const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const cors = require('cors');
const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductControler');
const SupportController = require('./controllers/SupportController');
const multer = require('multer');
const express = require('express');
const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware para JSON e CORS
app.use(express.json());
app.use(cors());

// Configuração de sessão com armazenamento em SQLite
app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.sqlite', dir: './src/sessions' }),
    secret: '4r&$fSE59Vuz5i59STP5qj',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 }, 
  })
);

// Rotas
app.post('/login', UserController.login);
app.post('/register', UserController.createUser);
app.post('/products', upload.single('image'), ProductController.createProduct);
app.post('/updateUser/:id', UserController.updateUser);
app.post('/support', SupportController.createSupportRequest);
app.get('/support', SupportController.listSupportRequests);
app.put('/support', SupportController.updateSupportStatus);

app.get('/settings', (req, res) => {
  if (!req.session.userId) {
      return res.redirect('/login');  
  }

  res.render('settings.html', { userId: req.session.userId });
});

// Iniciar servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
