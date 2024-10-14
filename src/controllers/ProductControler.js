const Product = require('../models/Product');

class ProductController {
    // Cria um novo produto
    static async createProduct(req, res) {
        try {
            // Verifica se o usuário está autenticado e se o ID está na sessão
            const userId = req.session.userId;
    
            if (!userId) {
                return res.status(401).send({ success: false, message: 'Usuário não autenticado' });
            }
    
            const { name, description, price, amount, category } = req.body;
            const image = req.file ? req.file.filename : null;
            const offers = req.body.offers ? true : false;
            const coupons = req.body.coupons ? true : false;
    
            // Cria o produto com o user_id da sessão
            await Product.create({
                name,
                description,
                price,
                amount,
                category,
                image,
                offers,
                coupons,
                user_id: userId
            });
    
            res.send({ success: true, message: 'Produto cadastrado com sucesso!' });
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            res.status(500).send({ success: false, message: 'Erro ao cadastrar o produto.' });
        }
    }

    // Lista os produtos de um usuário
    static async listUserProducts(req, res) {
        const userId = req.params.userId;
        try {
            const products = await Product.listByUser(userId);
            res.status(200).json({ success: true, products });
        } catch (err) {
            console.error('Erro ao listar produtos:', err);
            res.status(500).json({ success: false, message: 'Erro ao listar produtos.' });
        }
    }
}

module.exports = ProductController;
