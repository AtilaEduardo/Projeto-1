const { ipcRenderer } = require('electron');

// Obtem lista de produtos
ipcRenderer.send('get-produtos');

ipcRenderer.on('get-produtos-reply', (event, produtos) => {
  const lista = document.getElementById('produtos-lista');
  produtos.forEach(produto => {
    const item = document.createElement('li');
    item.textContent = `${produto.nome} - R$ ${produto.preco}`;
    lista.appendChild(item);
  });
});

// Adiciona novo produto
document.getElementById('produto-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const preco = document.getElementById('preco').value;
  const estoque = document.getElementById('estoque').value;

  ipcRenderer.send('add-produto', { nome, descricao, preco, estoque, usuario_idusuario: 1 });

  ipcRenderer.on('add-produto-reply', (event, response) => {
    if (response.success) {
      alert(response.success);
    } else {
      alert('Erro: ' + response.error);
    }
  });
});


// Gerenciando comunicação IPC com o renderer (frontend)
ipcMain.on('get-produtos', (event) => {
  db.all('SELECT * FROM produto', (err, rows) => {
    if (err) {
      event.reply('get-produtos-reply', { error: err.message });
    } else {
      event.reply('get-produtos-reply', rows);
    }
  });
});

// Evento de login de usuário
ipcMain.on('login', (event, credenciais) => {
  const { usuario, senha } = credenciais;

  // Verifica se os campos estão preenchidos
  if (!usuario || !senha) {
    event.reply('login-reply', { success: false, error: 'Usuário e senha são obrigatórios!' });
    return;
  }

  // Verifica o usuário no banco de dados
  db.get('SELECT * FROM usuario WHERE nome_usuario = ?', [usuario], (err, row) => {
    if (err) {
      event.reply('login-reply', { success: false, error: 'Erro ao verificar usuário no banco de dados.' });
    } else if (!row) {
      // Se o usuário não for encontrado
      event.reply('login-reply', { success: false, error: 'Usuário não encontrado!' });
    } else {
      // Verificar se a senha está correta
      if (row.senha === senha) {
        event.reply('login-reply', { success: true });  // Login bem-sucedido
      } else {
        event.reply('login-reply', { success: false, error: 'Senha incorreta!' });
      }
    }
  });
});
  
// Evento de cadastro de usuário
ipcMain.on('cadastro', (event, novoUsuario) => {
  const { nome, usuario, senha, email, senhaS, dataNascimento, cpf, endereco, admin } = novoUsuario;

  // Validações básicas
  if (!nome || !usuario || !senha || !email || !senhaS || !dataNascimento || !cpf || !endereco) {
    event.reply('cadastro-reply', { success: false, error: 'Todos os campos são obrigatórios!' });
    return;
  }

  // Validação de e-mail
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    event.reply('cadastro-reply', { success: false, error: 'Por favor, insira um e-mail válido.' });
    return;
  }

  // Validação de CPF
  if (cpf.length !== 11) {
    event.reply('cadastro-reply', { success: false, error: 'O CPF deve ter 11 dígitos.' });
    return;
  }

  // Validação de senha
  if (senha.length < 6) {
    event.reply('cadastro-reply', { success: false, error: 'A senha deve ter pelo menos 6 caracteres.' });
    return;
  }

  // Verifica se o nome de usuário já existe no banco de dados
  db.get('SELECT * FROM usuario WHERE nome_usuario = ?', [usuario], (err, row) => {
    if (err) {
      event.reply('cadastro-reply', { success: false, error: 'Erro ao verificar usuário no banco de dados.' });
    } else if (row) {
      event.reply('cadastro-reply', { success: false, error: 'Nome de usuário já existe!' });
    } else {
      // Se tudo estiver válido, inserir o usuário no banco de dados
      db.run(`INSERT INTO usuario (nome_completo, nome_usuario, senha, email, senha_seguranca, data_nascimento, cpf, endereco, is_admin)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nome, usuario, senha, email, senhaS, dataNascimento, cpf, endereco, admin],
        (err) => {
          if (err) {
            event.reply('cadastro-reply', { success: false, error: 'Erro ao cadastrar usuário.' });
          } else {
            event.reply('cadastro-reply', { success: true });
          }
        });
    }
  });
});
  
  ipcMain.on('recuperar-senha', (event, { email }) => {
    db.get('SELECT * FROM usuario WHERE email = ?', [email], (err, row) => {
      if (err) {
        event.reply('recuperar-senha-reply', { success: false, error: err.message });
      } else if (row) {
        
        event.reply('recuperar-senha-reply', { success: true });
      } else {
        event.reply('recuperar-senha-reply', { success: false, error: 'E-mail não encontrado.' });
      }
    });
  });

  ipcMain.on('add-produto', (event, produto) => {
    const { nome, descricao, preco, estoque, usuario_idusuario } = produto;
  
    // Verifica se todos os campos estão preenchidos
    if (!nome || !descricao || !preco || !estoque || !usuario_idusuario) {
      event.reply('add-produto-reply', { error: 'Todos os campos são obrigatórios!' });
      return;
    }
  
    // Inserir produto no banco de dados
    db.run(`INSERT INTO produto (nome, descricao, preco, estoque, data_cadastro, usuario_idusuario) 
            VALUES (?, ?, ?, ?, datetime('now'), ?)`,
      [nome, descricao, preco, estoque, usuario_idusuario], function(err) {
        if (err) {
          console.error('Erro ao adicionar produto:', err.message);
          event.reply('add-produto-reply', { error: err.message });
        } else {
          console.log('Produto adicionado com sucesso! ID:', this.lastID);
          event.reply('add-produto-reply', { success: 'Produto adicionado com sucesso!', id: this.lastID });
        }
      });
  });
  

// Recebe resposta do backend
ipcRenderer.on('login-reply', (event, response) => {
  if (response.success) {
    window.location = '../home/home.html';  // Redirecionar para a página principal (home)
  } else {
    alert('Usuário ou senha inválidos!');
  }
});

// Busca produtos do banco de dados
ipcMain.on('get-produtos', (event) => {
  db.all('SELECT * FROM produto', (err, rows) => {
    if (err) {
      event.reply('get-produtos-reply', { success: false, error: err.message });
    } else {
      event.reply('get-produtos-reply', { success: true, produtos: rows });
    }
  });
});
