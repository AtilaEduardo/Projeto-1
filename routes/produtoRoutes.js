const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/ProdutoController');

// Rota para pegar produtos com paginação
router.get('/produtos', produtoController.getProducts);

module.exports = router;