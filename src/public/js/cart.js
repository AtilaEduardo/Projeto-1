// Função para adicionar produtos ao carrinho
function addToCart(productName, price, imageUrl) {
    // Obter o carrinho do localStorage ou inicializar
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adicionar o produto ao carrinho
    const product = {
        name: productName,
        price: price,
        imageUrl: imageUrl,  // Adiciona a imagem ao objeto do produto
        quantity: 1
    };

    // Verifica se o produto já existe no carrinho
    const productExists = cart.find(item => item.name === productName);
    if (productExists) {
        productExists.quantity += 1; // Incrementa a quantidade se já existir
    } else {
        cart.push(product);
    }

    // Atualiza o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Alerta o usuário
    alert(`${productName} adicionado ao carrinho!`);
}

// Função para exibir o conteúdo do carrinho com imagens
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContent = '';

    if (cart.length > 0) {
        cart.forEach(item => {
            cartContent += `${item.name} - R$${item.price} x ${item.quantity}\n`;
            cartContent += `<img src="${item.imageUrl}" alt="${item.name}" style="width:50px;height:50px;">\n`;
        });
    } else {
        cartContent = 'Carrinho está vazio.';
    }

    document.getElementById('cart-display').innerHTML = cartContent;
}
